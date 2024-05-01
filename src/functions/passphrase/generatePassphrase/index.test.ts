import { beforeEach, describe, expect, it, vi } from 'vitest';

import * as rollDiceModule from '../dice/rollDice';
import * as getWordByIndexModule from '../getWordByIndex/getWordByIndex';
import { generatePassphrase } from './index';

vi.mock('../dice/rollDice');

vi.mock('../getWordByIndex/getWordByIndex');

describe('generatePassphrase', () => {
  const mockedRollDice = vi.mocked(rollDiceModule.rollDice);

  const mockedGetWordByNumber = vi.mocked(getWordByIndexModule.getWordByIndex);

  const defaultWord = 'word';

  beforeEach(() => {
    vi.resetAllMocks();

    mockedRollDice.mockReturnValue(1234);

    mockedGetWordByNumber.mockReturnValue(defaultWord);
  });

  it('should generate a passphrase with default configuration', () => {
    mockedGetWordByNumber
      .mockReturnValueOnce('foo')
      .mockReturnValueOnce('bar')
      .mockReturnValueOnce('baz')
      .mockReturnValueOnce('foobar');

    const passphrase = generatePassphrase();

    expect(passphrase).not.toMatch(/\d+/);

    expect(passphrase).toEqual(`foo-bar-baz-foobar`);
  });

  it('should generate a passphrase with a custom separator', () => {
    const customConfig = {
      numberOfWords: 3,
      defaultSeparator: '.',
      useNumbers: false,
      capitalize: false,
    };

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual(`${defaultWord}.${defaultWord}.${defaultWord}`);
  });

  it('should generate a passphrase with all mocked words', () => {
    const customConfig = {
      numberOfWords: 2,
      defaultSeparator: '|',
      useNumbers: false,
      capitalize: false,
    };

    mockedGetWordByNumber.mockReturnValueOnce('foo').mockReturnValueOnce('bar');

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual(`foo|bar`);
  });

  it('should include numbers in the passphrase when configured and ensure only one word has numbers prefixed', () => {
    const customConfig = {
      numberOfWords: 4,
      defaultSeparator: '-',
      useNumbers: true,
      capitalize: false,
    };

    mockedRollDice
      .mockReturnValueOnce(1234)
      .mockReturnValueOnce(4123)
      .mockReturnValueOnce(234)
      .mockReturnValueOnce(142);

    mockedGetWordByNumber
      .mockReturnValueOnce('apple')
      .mockReturnValueOnce('banana')
      .mockReturnValueOnce('cherry')
      .mockReturnValueOnce('date');

    const passphrase = generatePassphrase(customConfig);

    const match = passphrase.match(/\d+\w+/g);

    expect(match).toHaveLength(1);
  });

  it('should correctly handle numbers either prefixed or suffixed to the word', () => {
    const customConfig = {
      numberOfWords: 4,
      defaultSeparator: '-',
      useNumbers: true,
      capitalize: false,
    };

    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.4) // For prefixing or suffixing decision
      .mockReturnValueOnce(0.1); // For determining position of the word to modify

    const passphrase = generatePassphrase(customConfig);

    const prefixMatches = passphrase.match(/\b\d+\w+\b/g) || [];

    const suffixMatches = passphrase.match(/\b\w+\d+\b/g) || [];

    const totalMatches = [...prefixMatches, ...suffixMatches];

    expect(totalMatches).toHaveLength(1);

    vi.restoreAllMocks();
  });

  it('should capitalize each word in the passphrase', () => {
    const customConfig = {
      numberOfWords: 5,
      defaultSeparator: '.',
      useNumbers: false,
      capitalize: true,
    };

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual('Word.Word.Word.Word.Word');
  });

  it('should handle capitalization with numbers correctly included', () => {
    const customConfig = {
      numberOfWords: 3,
      defaultSeparator: '-',
      useNumbers: true,
      capitalize: true,
    };

    mockedGetWordByNumber
      .mockReturnValueOnce('apple')
      .mockReturnValueOnce('banana')
      .mockReturnValueOnce('cherry');

    vi.spyOn(global.Math, 'random')
      .mockReturnValueOnce(0.34) // Choosing the word (1st one, 0.34 * 3 ~ 1)
      .mockReturnValueOnce(0.1) // Prefixing number
      .mockReturnValueOnce(0.6); // Not used but could be for other logic

    const passphrase = generatePassphrase(customConfig);

    const matches =
      passphrase.match(/\b(\d+[A-Z][a-z]*|[A-Z][a-z]*\d+)\b/g) || [];

    expect(matches).toHaveLength(1);

    expect(passphrase.split('-').every((word) => /^[A-Z]/.test(word))).toBe(
      true
    );

    vi.restoreAllMocks();
  });

  it('should ensure the passphrase meets the minimum character length', () => {
    const customConfig = {
      numberOfWords: 2,
      defaultSeparator: '-',
      useNumbers: false,
      capitalize: false,
      minimumCharacters: 15,
    };

    mockedGetWordByNumber
      .mockReturnValueOnce('longword')
      .mockReturnValueOnce('longerword');

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase.length).toBeGreaterThanOrEqual(15);

    expect(passphrase).toEqual('longword-longerword');
  });

  it('should repeatedly generate a passphrase until it meets the minimum characters', () => {
    const customConfig = {
      numberOfWords: 2,
      defaultSeparator: '-',
      useNumbers: false,
      capitalize: false,
      minimumCharacters: 15,
    };

    mockedGetWordByNumber
      .mockReturnValueOnce('short')
      .mockReturnValueOnce('short');

    mockedGetWordByNumber
      .mockReturnValueOnce('sufficient')
      .mockReturnValueOnce('enough');

    const passphrase = generatePassphrase(customConfig);

    expect(passphrase).toEqual('sufficient-enough');

    expect(passphrase.length).toBeGreaterThanOrEqual(15);
  });
});
