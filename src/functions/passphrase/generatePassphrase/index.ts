import { defaultPassphraseConfiguration } from '@configuration/defaultPassphraseConfiguration';
import { PassphraseConfiguration } from '@interfaces/passphraseConfiguration';

import { rollDice } from '../dice/rollDice';
import { getWordByIndex } from '../getWordByIndex/getWordByIndex';

export const generatePassphrase = (
  configuration: PassphraseConfiguration = defaultPassphraseConfiguration
): string => {
  const { defaultSeparator, numberOfWords, useNumbers, capitalize } =
    configuration;

  const indices = Array.from({ length: numberOfWords }, rollDice);

  const words = indices.map(getWordByIndex);

  const numberIndex = useNumbers
    ? Math.floor(Math.random() * numberOfWords)
    : -1;

  const passphrase = words
    .map((word, index) => {
      const modifiedWord = capitalize
        ? word.charAt(0).toUpperCase() + word.slice(1)
        : word;

      if (useNumbers && index === numberIndex) {
        const randomNumber = Math.floor(Math.random() * 99) + 1;

        return Math.random() < 0.5
          ? `${randomNumber}${modifiedWord}`
          : `${modifiedWord}${randomNumber}`;
      }

      return modifiedWord;
    })
    .join(defaultSeparator);

  return passphrase;
};
