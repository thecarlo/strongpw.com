import { describe, expect, it } from 'vitest';

import { checkPasswordStrength } from './index';

describe('checkPasswordStrength', () => {
  it('should return Weak for short passwords', () => {
    const result = checkPasswordStrength('abc');

    expect(result.strength).toBe('Weak');
  });

  it('should return Weak for simple long passwords without digits or special characters', () => {
    const result = checkPasswordStrength('aaaaaaaaaaaa');

    expect(result.strength).toBe('Weak');
  });

  it('should return Moderate for passwords with sufficient length and mixed case', () => {
    const result = checkPasswordStrength('AbcdEfghIjkL');

    expect(result.strength).toBe('Weak');
  });

  it('should return Moderate for passwords with numbers and special characters but under 12 characters', () => {
    const result = checkPasswordStrength('A1b2@3#');

    expect(result.strength).toBe('Moderate');
  });

  it('should return Strong for passwords that are long and include various character types', () => {
    const result = checkPasswordStrength('Abcdefghijk1@3$5');

    expect(result.strength).toBe('Moderate');
  });

  it('should return Moderate for 3 word passphrase that is 28 characters and no numbers', () => {
    const password = 'sainthood-lukewarm-ibuprofen';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Moderate');
  });

  it('should return Strong for 3 word passphrase that is 28 characters and a number', () => {
    const password = 'sainthood-lukewarm-ibuprofe1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });

  it('should return Moderate for 20 characters, alphanumeric, numbers, special, lowercase', () => {
    const password = 'foo-bar-baz-foo-bar1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Moderate');
  });

  it('should return Strong for 20 characters, alphanumeric, numbers, special, lowercase', () => {
    const password = 'foo-bar-baz-foo-Bar1';

    const result = checkPasswordStrength(password);

    expect(result.strength).toBe('Strong');
  });
});
