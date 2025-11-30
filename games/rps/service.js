// games/rps/service.js
import { duels, getDuelId } from './state.js';

export function createDuel(chatId, initiatorId, opponentId) {
  const id = getDuelId(chatId, initiatorId, opponentId);

  duels.set(id, {
    id,
    A: initiatorId,
    B: opponentId,
    status: 'pending',
    moves: { },
  });

  return id;
}

export function acceptDuel(id) {
  const d = duels.get(id);
  if (!d) return null;
  d.status = 'playing';
  return d;
}

export function declineDuel(id) {
  duels.delete(id);
}

export function makeMove(id, userId, move) {
  const d = duels.get(id);
  if (!d || d.status !== 'playing') return null;

  d.moves[userId] = move;

  const A = d.moves[d.A];
  const B = d.moves[d.B];

  if (A && B) {
    const result = evaluate(A, B);
    d.status = 'finished';
    return { duel: d, result };
  }

  return { duel: d, result: null };
}

export function evaluate(a, b) {
  const wins = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock'
  };

  if (a === b) return 'draw';
  return wins[a] === b ? 'A' : 'B';
}
