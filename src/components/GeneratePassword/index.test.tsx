import React from 'react';
import { PasswordMode } from '@enums/passwordMode';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GeneratePassword } from './index';

afterEach(cleanup);

describe('GeneratePassword', () => {
  const passphraseDefaultLength = 3;

  const passwordDefaultLength = 15;

  it('should render the Generate Button', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const button = screen.getByRole('button', { name: /Generate/i });

    expect(button).toBeInTheDocument();
  });

  it('should render the Symbols and Numbers checkboxes if passwordMode === PasswordMode.Password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    screen.getByRole('checkbox', { name: /Symbols/i });

    screen.getByRole('checkbox', { name: /Numbers/i });
  });

  it('should render the Password Length title for the range slider if passwordMode === PasswordMode.Password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const rangeSliderTitle = screen.getByText('Password Length');

    expect(rangeSliderTitle.textContent).toBeTruthy();
  });

  it('should render the Capitalize and Numbers checkboxes if passwordMode === PasswordMode.Passphrase', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    screen.getByRole('checkbox', { name: /Capitalize/i });

    screen.getByRole('checkbox', { name: /Numbers/i });
  });

  it('should render the Words title for the range slider if passwordMode === PasswordMode.Passphrase', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const rangeSliderTitle = screen.getByText('Words');

    expect(rangeSliderTitle.textContent).toBeTruthy();
  });

  it('should render the pre element with the generated password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
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

  it('should render the password with the default length for passwordMode === PasswordMode.Password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent?.length).toBe(passwordDefaultLength);
  });

  it('should render the pre element with the generated passphrase if passwordMode === PasswordMode.Passphrase', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        uppercase={false}
        lowercase={false}
        numbers={false}
        symbols={false}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent).not.toBe('');

    expect(generatedPassword.textContent).to.include('-');

    expect(generatedPassword.textContent).toBeTruthy();
  });

  it('should copy the password to the clipboard when copy icon is clicked', async () => {
    const mockClipboard = {
      writeText: vi.fn(),
    };

    Object.defineProperty(navigator, 'clipboard', {
      value: mockClipboard,
      writable: true,
    });

    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const passwordPre = screen.getByTitle('generated password');

    passwordPre.textContent = 'testPassword123!';

    const copyIcon = screen.getByTitle('Copy Password');

    fireEvent.click(copyIcon);

    expect(mockClipboard.writeText).toHaveBeenCalledWith('testPassword123!');
  });

  it('should update the slider length when the password mode is changed to PasswordMode.Passphrase from PasswordMode.Password', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const slider = screen.getByRole('slider') as HTMLInputElement;

    const displayedLengthPassword = slider.value;

    expect(displayedLengthPassword).toBe(passwordDefaultLength.toString());

    const passphraseRadioButton = screen.getByLabelText(/Passphrase/i);

    fireEvent.click(passphraseRadioButton);

    const displayedLengthPassphrase = slider.value;

    expect(displayedLengthPassphrase).toBe(passphraseDefaultLength.toString());
  });

  it('should correctly update UI and internal state when password mode changes', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={false}
      />
    );

    const passwordRadio = screen.getByLabelText('Password') as HTMLInputElement;

    const passphraseRadio = screen.getByLabelText(
      'Passphrase'
    ) as HTMLInputElement;

    const slider = screen.getByRole('slider') as HTMLInputElement;

    await waitFor(() => {
      expect(passphraseRadio.checked).toBe(true);

      expect(slider.value).toBe(passphraseDefaultLength.toString());
    });

    fireEvent.click(passwordRadio);

    expect(slider.value).toBe(passwordDefaultLength.toString());

    fireEvent.click(passphraseRadio);

    expect(passphraseRadio.checked).toBe(true);

    expect(slider.value).toBe(passphraseDefaultLength.toString());

    const symbolsCheckbox = screen.queryByLabelText('Symbols');

    expect(symbolsCheckbox).toBeNull();

    const capitalizeCheckbox = screen.getByLabelText(
      'Capitalize'
    ) as HTMLInputElement;

    expect(capitalizeCheckbox.checked).toBeFalsy();

    const lengthDisplay = screen.getByText(/Words/);

    expect(lengthDisplay).toBeInTheDocument();
  });

  it('should toggle the checkbox state when a checkbox is clicked', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const numbersCheckbox = screen.getByRole('checkbox', {
      name: /Numbers/i,
    }) as HTMLInputElement;

    expect(numbersCheckbox.checked).toBe(false);

    fireEvent.click(numbersCheckbox);

    await waitFor(() => {
      expect(numbersCheckbox.checked).toBe(true);
    });

    fireEvent.click(numbersCheckbox);

    await waitFor(() => {
      expect(numbersCheckbox.checked).toBe(false);
    });
  });

  it('should update the password when the slider is changed', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const slider = screen.getByRole('slider') as HTMLInputElement;

    fireEvent.change(slider, { target: { value: '20' } });

    expect(slider.value).toBe('20');

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent?.length).toBe(20);
  });

  it('should display Weak password for a password that is 10 characters in length', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={false}
        lowercase={true}
        numbers={false}
        symbols={false}
      />
    );

    fireEvent.change(screen.getByRole('slider'), { target: { value: '10' } });

    const passwordStrengthIndicator = screen.getByTitle(
      /Password Strength: Weak/
    );

    expect(passwordStrengthIndicator).toBeInTheDocument();

    const passwordStrengthIndicatorFirstChild =
      passwordStrengthIndicator.firstElementChild;

    const passwordStrengthIndicatorSecondChild =
      passwordStrengthIndicatorFirstChild?.firstChild;

    expect(passwordStrengthIndicatorSecondChild).toHaveClass('bg-red-500');
  });

  it('should display Strong password for a password that is 35 characters in length', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Password}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    fireEvent.change(screen.getByRole('slider'), { target: { value: '35' } });

    const passwordStrengthIndicator = screen.getByTitle(
      /Password Strength: Very Strong/
    );

    expect(passwordStrengthIndicator).toBeInTheDocument();

    const passwordStrengthIndicatorFirstChild =
      passwordStrengthIndicator.firstElementChild;

    const passwordStrengthIndicatorSecondChild =
      passwordStrengthIndicatorFirstChild?.firstChild;

    expect(passwordStrengthIndicatorSecondChild).toHaveClass('bg-green-500');
  });
});
