function d20(ctx) {
const roll = Math.floor(Math.random() * 20) + 1
  ctx.reply(`🎲 Выпало: ${roll}`)
}

function nd20(ctx) {
  ctx.reply("🎲 Выпало: 20")
}

// Универсальная команда: /roll 3d20
function roll(ctx) {
  const input = ctx.message.text.split(' ')[1] // берём "3d6"
  if (!input) return ctx.reply('Используй /roll 3d6')
  const match = input.match(/^(\d*)d(\d+)$/)
  if (!match) return ctx.reply('Неверный формат. Пример: /roll 3d6')

  const count = parseInt(match[1] || '1')
  const sides = parseInt(match[2])
  const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
  const total = rolls.reduce((a, b) => a + b, 0)
  ctx.reply(`🎲 ${count}d${sides} → [${rolls.join(', ')}] = ${total}`)
}

// Экспорты кубиков
module.exports = {
  d20,
  nd20,
  roll, //Пример: /roll 3d6
};