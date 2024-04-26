import { describe, expect, it } from 'vitest';

import { shufflePassword } from './shufflePassword';

describe('shufflePassword', () => {
  it('preserves the length of the password', () => {
    const password = '1234567890abcdef';

    const shuffled = shufflePassword(password);

    expect(shuffled.length).toBe(password.length);
  });

  it('contains the same characters as the input', () => {
    const password = '1234567890abcdef';

    const shuffled = shufflePassword(password);

    const originalChars = password.split('').sort().join('');

    const shuffledChars = shuffled.split('').sort().join('');

    expect(shuffledChars).toBe(originalChars);
  });

  it('produces different outputs on successive calls', () => {
    const password = '1234567890abcdef';

    const shuffled1 = shufflePassword(password);

    const shuffled2 = shufflePassword(password);

    expect(shuffled1).not.toBe(shuffled2);
  });
});
