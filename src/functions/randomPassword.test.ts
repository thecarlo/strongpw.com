import { PasswordMode } from '../enums/passwordMode';
import { randomPassword } from './randomPassword';

describe('randomPassword', () => {
  it('should throw an error if the length parameter is undefined', () => {
    expect(() => {
      randomPassword(
        PasswordMode.Password,
        undefined,
        true,
        true,
        true,
        true,
        false
      );
    }).toThrow('length parameter is undefined');
  });

  it('should throw an error if the lowercase parameter is undefined', () => {
    expect(() => {
      randomPassword(PasswordMode.Password, 1, null, true, true, true, false);
    }).toThrow('lowercase parameter is undefined');
  });

  it('should throw an error if the uppercase parameter is undefined', () => {
    expect(() => {
      randomPassword(PasswordMode.Password, 1, true, null, true, true, false);
    }).toThrow('uppercase parameter is undefined');
  });

  it('should throw an error if the numbers parameter is undefined', () => {
    expect(() => {
      randomPassword(PasswordMode.Password, 1, true, true, null, true, false);
    }).toThrow('numbers parameter is undefined');
  });

  it('should throw an error if the symbols parameter is undefined', () => {
    expect(() => {
      randomPassword(PasswordMode.Password, 1, true, true, true, null, false);
    }).toThrow('symbols parameter is undefined');
  });

  it('should return a password with the expected length', () => {
    expect(
      randomPassword(PasswordMode.Password, 9, true, true, true, true, false)
    ).toHaveLength(9);

    expect(
      randomPassword(PasswordMode.Password, 38, true, true, true, true, false)
    ).toHaveLength(38);

    expect(
      randomPassword(PasswordMode.Password, 100, true, true, true, true, false)
    ).toHaveLength(100);
  });

  it('should return a password with no lowercase characters if lowercase is set to false', () => {
    expect(
      randomPassword(PasswordMode.Password, 100, false, true, true, true, false)
    ).not.toMatch(/[a-z]/);
  });

  it('should return a password with no uppercase characters if uppercase is set to false', () => {
    expect(
      randomPassword(PasswordMode.Password, 100, true, false, true, true, false)
    ).not.toMatch(/[A-Z]/);
  });

  it('should return a password with no numbers if numbers is set to false', () => {
    expect(
      randomPassword(PasswordMode.Password, 100, true, true, false, true, false)
    ).not.toMatch(/[0-9]/);
  });

  it('should return a password with no symbols if symbols is set to false', () => {
    expect(
      randomPassword(PasswordMode.Password, 100, true, true, true, false, false)
    ).not.toMatch(/[^A-Za-z0-9]/);
  });

  it('should generate a passphrase with the specified number of words', () => {
    const passphrase = randomPassword(
      PasswordMode.Passphrase,
      4,
      false,
      false,
      false,
      false,
      false
    );

    expect(passphrase.split('-').length).toBe(4);
  });

  it('should include numbers in the passphrase when requested', () => {
    const passphrase = randomPassword(
      PasswordMode.Passphrase,
      2,
      false,
      false,
      true,
      false,
      false
    );

    expect(passphrase).toMatch(/[0-9]/);
  });

  it('should not include numbers in the passphrase when not requested', () => {
    const passphrase = randomPassword(
      PasswordMode.Passphrase,
      4,
      false,
      false,
      false,
      false,
      false
    );

    expect(passphrase).not.toMatch(/[0-9]/);
  });
});
