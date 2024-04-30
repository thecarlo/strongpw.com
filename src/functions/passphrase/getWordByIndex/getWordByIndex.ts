import { wordMap } from '@functions/passphrase/wordlist/wordMap';

export const getWordByIndex = (index: number): string => {
  const wordList = wordMap;

  const word = wordList.get(index);

  if (!word) {
    throw new Error(`No word found for index: ${index}`);
  }

  return word;
};
