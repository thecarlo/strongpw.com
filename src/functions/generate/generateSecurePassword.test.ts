import { SecurePasswordOptions } from '@interfaces/securePasswordOptions';
import { describe, expect, it, vi } from 'vitest';

import { generateSecurePassword } from './generateSecurePassword';
import { shufflePassword } from './shufflePassword';

vi.mock('./shufflePassword', () => ({
  shufflePassword: vi.fn().mockImplementation((input: string) => input),
}));

describe('generateSecurePassword', () => {
  it('throws an error if no character types are selected', () => {
    const options: SecurePasswordOptions = {
      length: 10,
      lowercase: false,
      uppercase: false,
      numbers: false,
      symbols: false,
    };

    expect(() => generateSecurePassword(options)).toThrow(
      'At least one character type should be selected'
    );
  });

  it('generates a password with the correct length', () => {
    const options: SecurePasswordOptions = {
      length: 10,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    };

    const result = generateSecurePassword(options);

    expect(result.length).toBe(10);
  });

  it('ensures that the generated password contains at least one of each enabled category', () => {
    const options: SecurePasswordOptions = {
      length: 12,
      lowercase: true,
      uppercase: true,
      numbers: true,
      symbols: true,
    };

    const password = generateSecurePassword(options);

    expect(password).toMatch(/[a-z]/);

    expect(password).toMatch(/[A-Z]/);

    expect(password).toMatch(/[0-9]/);

    expect(password).toMatch(/[!@#$%^&*()_+\-=[\]{}|;:'",.<>?~]/);
  });

  it('calls shufflePassword with the assembled password', () => {
    const options: SecurePasswordOptions = {
      length: 8,
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    };

    generateSecurePassword(options);

    expect(shufflePassword).toHaveBeenCalled();
  });
});
