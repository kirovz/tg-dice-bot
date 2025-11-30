// Комплименты /compliment
const complimentArr = [
  "Молодчковый",
  "Секси",
  "Крутой",
  "Васьковый",
  "Гигачадовый",
  "Так се",
  "Брутальный",
  "Умный",
  "Хороший",
  "Кринджовый",
  "Гениальный",
];

// Команда compliment
function compliment(ctx) {
  const rand = Math.floor(Math.random() * complimentArr.length);
  ctx.reply(`${complimentArr[rand]}`);
};

module.exports = {
  compliment,
};