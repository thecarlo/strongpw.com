import { generatePassphrase } from '@humankode/secure-passphrase-generator';
import password from 'secure-random-password';

import { PasswordMode } from '../enums/passwordMode';
import { PassphraseConfiguration } from '../interfaces/passphraseConfiguration';

export const randomPassword = (
  passwordMode: PasswordMode,
  length: number,
  lowercase: boolean,
  uppercase: boolean,
  numbers: boolean,
  symbols: boolean,
  capitalize: boolean
): string => {
  if (passwordMode === PasswordMode.Passphrase) {
    if (numbers === null || typeof numbers === 'undefined') {
      throw new Error('numbers parameter is undefined');
    }

    if (capitalize === null || typeof capitalize === 'undefined') {
      throw new Error('capitalize parameter is undefined');
    }

    const passphraseConfiguration: PassphraseConfiguration = {
      numberOfWords: length,
      defaultSeparator: '-',
      useNumbers: numbers,
      capitalize,
    };

    return generatePassphrase(passphraseConfiguration);
  }

  if (typeof length === 'undefined') {
    throw new Error('length parameter is undefined');
  }

  if (lowercase === null || typeof lowercase === 'undefined') {
    throw new Error('lowercase parameter is undefined');
  }

  if (uppercase === null || typeof uppercase === 'undefined') {
    throw new Error('uppercase parameter is undefined');
  }

  if (numbers === null || typeof numbers === 'undefined') {
    throw new Error('numbers parameter is undefined');
  }

  if (symbols === null || typeof symbols === 'undefined') {
    throw new Error('symbols parameter is undefined');
  }

  const characters = [];

  lowercase && characters.push(password.lower);

  uppercase && characters.push(password.upper);

  numbers && characters.push(password.digits);

  symbols && characters.push(password.symbols);

  return password.randomPassword({
    length: length,
    characters: characters,
  });
};
