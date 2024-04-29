import { CrackTime } from '@interfaces/crackTime';

import { crackTimes } from './crackTimes';

export const estimateCrackTime = (password: string): string => {
  const hasUpper = /[A-Z]/.test(password);

  const hasLower = /[a-z]/.test(password);

  const hasNumbers = /[0-9]/.test(password);

  const hasSpecial = /[!@#$%^&*()_+\-=[\]{}|;:'",.<>?]/.test(password);

  let key: keyof CrackTime = 'onlyAlpha';

  if (hasUpper && hasLower && hasNumbers && hasSpecial) {
    key = 'allChars';
  } else if (hasUpper && hasLower && hasNumbers) {
    key = 'onlyAlphaNum';
  }

  const length = password.length;

  if (length > 18) {
    return 'Trillions of years';
  } else if (length >= 8 && crackTimes[length]) {
    return crackTimes[length][key];
  }

  return 'Not specified';
};
