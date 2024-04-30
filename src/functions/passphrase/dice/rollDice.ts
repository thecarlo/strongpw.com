import { rollDie } from './rollDie';

export const rollDice = (): number => {
  const numberOfDiceRolls = 4;

  const diceRolls = Array.from({ length: numberOfDiceRolls }, () => rollDie());

  const concatenatedResult = diceRolls.join('');

  return parseInt(concatenatedResult);
};
