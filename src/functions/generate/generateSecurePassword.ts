import { SecurePasswordOptions } from '@interfaces/securePasswordOptions';

import { shufflePassword } from './shufflePassword';

export const generateSecurePassword = (
  options: SecurePasswordOptions
): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const numberChars = '0123456789';

  const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?~';

  const possibleChars = [
    options.lowercase ? lowercaseChars : '',
    options.uppercase ? uppercaseChars : '',
    options.numbers ? numberChars : '',
    options.symbols ? symbolChars : '',
  ]
    .filter(Boolean)
    .join('');

  if (possibleChars.length === 0) {
    throw new Error('At least one character type should be selected');
  }

  const randomIndexes = new Uint32Array(options.length);

  crypto.getRandomValues(randomIndexes);

  const passwordChars = Array.from(randomIndexes, (value) => {
    return possibleChars[value % possibleChars.length];
  });

  const ensuredCategories = [
    options.lowercase ? lowercaseChars : '',
    options.uppercase ? uppercaseChars : '',
    options.numbers ? numberChars : '',
    options.symbols ? symbolChars : '',
  ]
    .filter(Boolean)
    .map((chars) => {
      const randomIndex = new Uint32Array(1);

      crypto.getRandomValues(randomIndex);

      return chars[randomIndex[0] % chars.length];
    });

  const completePassword = ensuredCategories
    .concat(passwordChars.slice(ensuredCategories.length))
    .join('');

  return shufflePassword(completePassword);
};
