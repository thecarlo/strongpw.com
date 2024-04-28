import { describe, expect, it } from 'vitest';

import { checkPasswordStrength } from './index';

describe('checkPasswordStrength', () => {
  it('should return Weak for a password 3 characters in length and lowercase', () => {
    const result = checkPasswordStrength('abc');

    expect(result.strength).toBe('Weak');
  });

  it('should return Weak for simple long passwords without digits or special characters', () => {
    const result = checkPasswordStrength('abcdefghijabcfd');

    expect(result.strength).toBe('Weak');
  });

  it('should return Moderate for a 20 character password and mixed case only', () => {
    const result = checkPasswordStrength('AbcdEfghIjkLaabbccca');

    expect(result.strength).toBe('Moderate');
  });

  it('should return Weak for an 11 character password with numbers and special characters', () => {
    const result = checkPasswordStrength('A1b2@3#-01f');

    expect(result.strength).toBe('Weak');
  });

  it('should return Strong for passwords that are long and include various character types', () => {
    const result = checkPasswordStrength('Abcdefgkjkjkjkjkkjkjsfhijk1@3$5');

    expect(result.strength).toBe('Strong');
  });

  it('should return Strong for 3 word passphrase that is 28 characters and no numbers', () => {
    const password = 'sainthood-lukewarm-ibuprofen';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });

  it('should return Strong for 3 word passphrase that is 28 characters and a number', () => {
    const password = 'sainthood-lukewarm-ibuprofe1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });

  it('should return Strong for 20 characters, alphanumeric, numbers, special, lowercase', () => {
    const password = 'foo-bar-baz-foo-bar1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });

  it('should return Strong for 20 characters, alphanumeric, numbers, special, mixed case', () => {
    const password = 'foo-bar-baz-foo-Bar1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });
});
