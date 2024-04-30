import { describe, expect, it } from 'vitest';

import { rollDie } from './rollDie';

describe('rollDie', () => {
  it('should return a number between 1 and 6', () => {
    for (let i = 0; i < 10; i++) {
      const result = rollDie();

      expect(result).toBeGreaterThanOrEqual(1);

      expect(result).toBeLessThanOrEqual(6);
    }
  });
});
