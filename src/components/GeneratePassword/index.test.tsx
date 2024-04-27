import React from 'react';
import { PasswordMode } from '@enums/passwordMode';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GeneratePassword } from './index';

afterEach(cleanup);

describe('GeneratePassword', () => {
  it('should render the Capitalize and Numbers checkboxes', () => {
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

    screen.getByRole('checkbox', { name: /Capitalize/i });

    screen.getByRole('checkbox', { name: /Numbers/i });
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
        passwordMode={PasswordMode.Passphrase}
        length={5}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const generatedPassword = screen.getByTitle('generated password');

    expect(generatedPassword.textContent?.length).toBeGreaterThan(20);
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
        length={15}
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

  // it('should update the state correctly when the password mode is changed to passphrase', () => {
  //   render(
  //     <GeneratePassword
  //       passwordMode={PasswordMode.Password}
  //       length={25}
  //       uppercase={true}
  //       lowercase={true}
  //       numbers={true}
  //       symbols={true}
  //     />
  //   );

  //   let lengthDisplay = screen.getByText(/25/);

  //   expect(lengthDisplay).toBeInTheDocument();

  //   const passphraseRadioButton = screen.getByLabelText(/Passphrase/i);

  //   fireEvent.click(passphraseRadioButton);

  //   lengthDisplay = screen.getByText(/4/);

  //   expect(lengthDisplay).toBeInTheDocument();

  //   const capitalizeCheckbox = screen.getByRole('checkbox', {
  //     name: /Capitalize/i,
  //   });

  //   expect(capitalizeCheckbox).toBeChecked();
  // });

  it('should update the length state when the slider changes', () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        length={5}
        uppercase={true}
        lowercase={true}
        numbers={true}
        symbols={true}
      />
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '8' } });

    const displayedLength = screen.getByText(/8/);

    expect(displayedLength).toBeInTheDocument();

    const generateButton = screen.getByRole('button', { name: /Generate/i });

    fireEvent.click(generateButton);

    const passwordPre = screen.getByTitle('generated password');

    expect(passwordPre?.textContent?.length).toBeGreaterThan(20);
  });

  it('should correctly update UI and internal state when password mode changes', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        length={4}
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

      expect(slider.value).toBe('4');
    });

    fireEvent.click(passwordRadio);

    expect(slider.value).toBe('25');

    fireEvent.click(passphraseRadio);

    expect(passphraseRadio.checked).toBe(true);

    expect(slider.value).toBe('4');

    const symbolsCheckbox = screen.queryByLabelText('Symbols');

    expect(symbolsCheckbox).toBeNull();

    const capitalizeCheckbox = screen.getByLabelText(
      'Capitalize'
    ) as HTMLInputElement;

    expect(capitalizeCheckbox.checked).toBeTruthy();

    const lengthDisplay = screen.getByText(/Words/);

    expect(lengthDisplay).toBeInTheDocument();
  });

  it('should toggle the checkbox state when a checkbox is clicked', async () => {
    render(
      <GeneratePassword
        passwordMode={PasswordMode.Passphrase}
        length={3}
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
});
