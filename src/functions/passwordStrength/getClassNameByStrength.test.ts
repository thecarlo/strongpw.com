import { describe, expect, it } from 'vitest';

import { getClassNameByStrength } from './getClassnameByStrength';

describe('getClassNameByStrength', () => {
  it('returns correct class for "Weak" strength', () => {
    const result = getClassNameByStrength('Weak');

    expect(result).toBe('bg-red-500 w-1/4');
  });

  it('returns correct class for "Moderate" strength', () => {
    const result = getClassNameByStrength('Moderate');

    expect(result).toBe('bg-yellow-500 w-2/4');
  });

  it('returns correct class for "Strong" strength', () => {
    const result = getClassNameByStrength('Strong');

    expect(result).toBe('bg-green-500 w-3/4');
  });

  it('returns correct class for "Very Strong" strength', () => {
    const result = getClassNameByStrength('Very Strong');

    expect(result).toBe('bg-green-500 w-full');
  });

  it('returns default class for unrecognized strength', () => {
    const result = getClassNameByStrength('Undefined');

    expect(result).toBe('bg-red-500 w-1/4');
  });
});
