// games/rps/controller.js
import {
  createDuel, acceptDuel, declineDuel, makeMove
} from './service.js';

import { getDuelId } from './state.js';

export function registerRps(bot) {

  bot.hears(/@(\S+)\s+дуэль/, async (ctx) => {
    const chatId = ctx.chat.id;
    const initiatorId = ctx.from.id;

    const entities = ctx.message.entities || [];
    const mention = entities.find(e => e.type === 'mention');

    if (!mention) return ctx.reply('Нужно указать @пользователя.');

    const username = ctx.message.text.slice(mention.offset + 1, mention.offset + mention.length);
    const members = await ctx.getChatAdministrators().catch(() => []); // fallback

    // Получить userId по username
    // (в реальности нужен кэш или message.from... но пусть будет "условно")
    const opponent = await ctx.telegram.getChatMember(chatId, username).catch(() => null);
    if (!opponent) return ctx.reply('Не могу найти пользователя.');

    const opponentId = opponent.user.id;

    const duelId = createDuel(chatId, initiatorId, opponentId);

    return ctx.reply(
      `@${username}, вас вызывают на дуэль!`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Принять', callback_data: `rps_accept:${duelId}` }],
            [{ text: 'Отклонить', callback_data: `rps_decline:${duelId}` }]
          ]
        }
      }
    );
  });

  bot.action(/^rps_accept:(.+)/, async (ctx) => {
    const duelId = ctx.match[1];
    const d = acceptDuel(duelId);
    if (!d) return ctx.answerCbQuery('Дуэль не найдена.');

    await ctx.editMessageText('Дуэль принята! Игра начинается.');

    return ctx.reply(
      'Выберите ход:',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: 'Камень', callback_data: `rps_move:${duelId}:rock` },
              { text: 'Ножницы', callback_data: `rps_move:${duelId}:scissors` },
              { text: 'Бумага', callback_data: `rps_move:${duelId}:paper` }
            ]
          ]
        }
      }
    );
  });

  bot.action(/^rps_decline:(.+)/, async (ctx) => {
    declineDuel(ctx.match[1]);
    return ctx.editMessageText('Дуэль отклонена.');
  });

  bot.action(/^rps_move:(.+):(.+)/, async (ctx) => {
    const duelId = ctx.match[1];
    const move = ctx.match[2];
    const userId = ctx.from.id;

    const { duel, result } = makeMove(duelId, userId, move);

    if (!duel) return ctx.answerCbQuery('Дуэль завершена или не существует.');
    if (!result) return ctx.answerCbQuery('Ход принят.');

    const A = duel.A;
    const B = duel.B;

    const text =
      result === 'draw'
        ? 'Ничья!'
        : result === 'A'
          ? `Победил игрок ${A}`
          : `Победил игрок ${B}`;

    return ctx.reply(text);
  });
}
