// commands/games.js
const { magic8Ball } = require("../games/magic8ball");
const { d20 } = require("../games/dice");
const { nd20 } = require("../games/dice");
const { roll } = require("../games/dice");
const { compliment } = require("../commands/compliment");

function registerGameCommands(bot) {
  bot.command("8ball", magic8Ball);
  bot.command("d20", d20);
  bot.command("nd20", d20);
  bot.command("roll", d20);
  bot.command("compliment", compliment);
}

module.exports = {
  registerGameCommands,
};
