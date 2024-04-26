import { SecurePasswordOptions } from '@interfaces/securePasswordOptions';

import { shufflePassword } from './shufflePassword';

export const generateSecurePassword = (
  options: SecurePasswordOptions
): string => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';

  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const numberChars = '0123456789';

  const symbolChars = '!@#$%^&*()_+-=[]{}|;:",.<>?';

  let possibleChars = '';

  if (options.lowercase) possibleChars += lowercaseChars;

  if (options.uppercase) possibleChars += uppercaseChars;

  if (options.numbers) possibleChars += numberChars;

  if (options.symbols) possibleChars += symbolChars;

  if (possibleChars.length === 0) {
    throw new Error('At least one character type should be selected');
  }

  const randomValues = new Uint8Array(options.length);

  crypto.getRandomValues(randomValues);
  let password = '';

  const allCategories = [
    { enabled: options.lowercase, chars: lowercaseChars },
    { enabled: options.uppercase, chars: uppercaseChars },
    { enabled: options.numbers, chars: numberChars },
    { enabled: options.symbols, chars: symbolChars },
  ];

  for (const category of allCategories) {
    if (category.enabled) {
      const randomIndex = Math.floor(Math.random() * category.chars.length);

      password += category.chars[randomIndex];
    }
  }

  for (let i = password.length; i < options.length; i++) {
    const randomIndex = randomValues[i] % possibleChars.length;

    password += possibleChars[randomIndex];
  }

  return shufflePassword(password);
};
