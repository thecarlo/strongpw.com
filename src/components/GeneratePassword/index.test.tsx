import React from 'react';
import { PasswordMode } from '@enums/passwordMode';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { GeneratePassword } from './index';

afterEach(cleanup);

describe('GeneratePassword', () => {
  it('should render the Symbols and Numbers checkboxes', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        length={25}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    screen.getByRole('checkbox', { name: /Numbers/i });

    screen.getByRole('checkbox', { name: /Symbols/i });
  });

  it('should render the pre element with the generated password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        length={10}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent).not.toBe('');

    expect(generatedPassword.textContent).toBeTruthy();
  });

  it('should render the pre element with the expected password length', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        length={10}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent).toHaveLength(10);
  });

  it('should render the pre element with the generated passphrase', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        length={2}
        uppercase={false}
        lowercase={false}
        numbers={false}
        symbols={false}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent).not.toBe('');

    expect(generatedPassword.textContent).toBeTruthy();
  });

  it('should render the pre element with the expected passphrase length', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        length={2}
        uppercase={false}
        lowercase={false}
        numbers={false}
        symbols={false}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent).not.toBe('');
  });
});
