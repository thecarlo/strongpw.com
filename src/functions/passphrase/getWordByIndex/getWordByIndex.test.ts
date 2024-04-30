import { describe, expect, it } from 'vitest';

import { getWordByIndex } from './getWordByIndex';

describe('getWordByIndex', () => {
  it('should return the correct word for a given index', () => {
    const word = getWordByIndex(3366);

    expect(word).toEqual('happiness');
  });

  it('should throw an error if no word is found for the given index', () => {
    expect(() => getWordByIndex(9999)).toThrow('No word found for index: 9999');
  });

  it('should propagate errors correctly', () => {
    const errorMessage = 'No word found for index: 7777';

    expect(() => getWordByIndex(7777)).toThrow(errorMessage);
  });
});
