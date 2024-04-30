import { randomBytes } from 'crypto';

export const rollDie = (): number => {
  const buffer = randomBytes(4);

  const randomNumber = buffer.readUInt32BE(0);

  return (randomNumber % 6) + 1;
};
