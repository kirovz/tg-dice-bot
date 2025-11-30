// games/rps/state.js
export const duels = new Map();

// duelId формируется строго: chatId:user1:user2
export function getDuelId(chatId, userA, userB) {
  return `${chatId}:${userA}:${userB}`;
}
