import { describe, expect, it } from 'vitest';

import { rollDice } from './rollDice';

describe('rollDice', () => {
  it('should return a number that is 4 digits in length', () => {
    const result = rollDice();

    expect(result.toString().length).toEqual(4);
  });

  it('should return a number that is 4 digits in length, with each number value being between 1 and 6', () => {
    const result = rollDice();

    const resultArray = result.toString().split('');

    resultArray.forEach((result) => {
      expect(parseInt(result)).toBeGreaterThanOrEqual(1);

      expect(parseInt(result)).toBeLessThanOrEqual(6);
    });
  });
});
