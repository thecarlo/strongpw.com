import { describe, expect, it } from 'vitest';

import { checkPasswordStrength } from './checkPasswordStrength';

describe('checkPasswordStrength', () => {
  describe('Password', () => {
    it('should return Weak for a password 3 characters in length and lowercase', () => {
      const result = checkPasswordStrength('abc');

      expect(result.strength).toBe('Weak');
    });

    it('should return Weak for simple password with no mixed case, numbers or special characters', () => {
      const result = checkPasswordStrength('abcdefghijabcfd');

      expect(result.strength).toBe('Weak');
    });

    it('should return Weak for 12 character password and mixed case', () => {
      const result = checkPasswordStrength('KSGDjAxSWiyO');

      expect(result.strength).toBe('Weak');
    });

    it('should return Very Strong for a 20 character password and mixed case only', () => {
      const result = checkPasswordStrength('idjxUAlbokOdUQZEPKWl');

      expect(result.strength).toBe('Very Strong');
    });

    it('should return Weak for an 11 character password with numbers and special characters', () => {
      const result = checkPasswordStrength('$P?u+Lop0S5');

      expect(result.strength).toBe('Weak');
    });

    it('should return Very Strong for 20 character password with symbols, numbers and mixed case', () => {
      const result = checkPasswordStrength('Zh5;Tg3m[y4}{2p3mWaE');

      expect(result.strength).toBe('Very Strong');
    });

    it('should return Moderate for 12 characters, alphanumeric, numbers, special, mixed case', () => {
      const password = 'abcd1fgh.jkA';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Moderate');
    });

    it('should return Strong for 17 characters, alphanumeric, mixed case', () => {
      const password = 'VUcDefNVEbxMDEXsr';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Strong');
    });
  });

  describe('Passphrase', () => {
    it('should return "Weak" for 10 character passphrase', () => {
      const password = 'tavern-pop';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Weak');
    });

    it('should return "Weak" for 14 character passphrase', () => {
      const password = 'tavern-popcorn';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Weak');
    });

    it('should return "Weak" for 15 character passphrase', () => {
      const password = 'justifying-idly';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Moderate');
    });

    it('should return "Moderate" for 16 character passphrase', () => {
      const password = 'enormous-gimmick';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Moderate');
    });

    it('should return Very Strong for 4 word 35 character passphrase with no capitalization and numbers', () => {
      const password = 'collarbone-peroxide-ropelike-kennel';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Very Strong');
    });

    it('should return "Very Strong" for 3 word 24 character passphrase with no capitalization and numbers', () => {
      const password = 'update-onward-aquamarine';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Very Strong');
    });

    it('should return "should return "Very Strong" for 20 character passphrase with numbers and no capitalization', () => {
      const password = 'foo-bar-baz-foo-bar1';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Very Strong');
    });

    it('should return "Very Strong" for 20 character passphrase with numbers and capitalization', () => {
      const password = 'foo-bar-baz-foo-Bar1';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Very Strong');
    });

    it('should return "Very Strong" for 18 character passphrase without numbers and capitalization', () => {
      const password = 'rhubarb-oscillator';

      const result = checkPasswordStrength(password);

      expect(result.strength).toBe('Very Strong');
    });
  });
});
