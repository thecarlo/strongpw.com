/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useRef, useState } from 'react';
import { checkPasswordStrength } from '@functions/checkPasswordStrength';

import { PasswordMode } from '../../enums/passwordMode';
import { randomPassword } from '../../functions/randomPassword';
import { GeneratePasswordProps } from '../../interfaces/props/generatePasswordProps';
import { Checkbox } from '../Checkbox';

import './style.scss';

export const GeneratePassword = (props: GeneratePasswordProps) => {
  const { length: defaultLength, lowercase, uppercase } = props;

  const [passwordMode, setPasswordMode] = useState<PasswordMode>(
    PasswordMode.Password
  );

  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const [checkedState, setCheckedState] = useState({
    symbols: true,
    numbers: true,
    capitalize: true,
  });

  const passwordRef = useRef<HTMLPreElement>(null);

  const [length, setLength] = useState<number>(defaultLength);

  const [password, setPassword] = useState<string>('');

  const handleOnCopy = async () => {
    if (passwordRef.current) {
      try {
        const textToCopy = passwordRef.current.textContent ?? '';

        await navigator.clipboard.writeText(textToCopy);

        const selection = window.getSelection();

        if (selection) {
          const range = document.createRange();

          selection.removeAllRanges();

          range.selectNodeContents(passwordRef.current);

          selection.addRange(range);
        }
      } catch (error) {
        console.error('Failed to copy password');
      }
    }
  };

  const handleOnGenerate = () => {
    try {
      const newPassword = randomPassword(
        passwordMode,
        length,
        lowercase,
        uppercase,
        checkedState.numbers,
        checkedState.symbols,
        checkedState.capitalize
      );

      setPassword(newPassword);

      const strengthResult = checkPasswordStrength(newPassword);

      setPasswordStrength(strengthResult.strength);

      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
      }
    } catch (error) {
      console.error('Failed to generate password');
    }
  };

  useEffect(() => {
    handleOnGenerate();

    if (password) {
      const strengthResult = checkPasswordStrength(password);

      setPasswordStrength(strengthResult.strength);
    }
  }, [
    passwordStrength,
    passwordMode,
    length,
    uppercase,
    lowercase,
    checkedState,
  ]);

  const handleOnChange = (checkedName: keyof typeof checkedState) => {
    setCheckedState((prev) => ({ ...prev, [checkedName]: !prev[checkedName] }));

    handleOnGenerate();
  };

  const handlePasswordModeChange = (newMode: PasswordMode) => {
    setPasswordMode(newMode);

    const newLength = newMode === PasswordMode.Passphrase ? 4 : 25;

    setLength(newLength);

    setCheckedState((prev) => ({
      ...prev,
      numbers: newMode === PasswordMode.Password,
      symbols: newMode === PasswordMode.Password,
      capitalize: newMode === PasswordMode.Passphrase ? prev.capitalize : false,
    }));

    handleOnGenerate();
  };

  const getCheckboxes = () => {
    return (
      passwordMode === PasswordMode.Password
        ? ['symbols', 'numbers']
        : ['capitalize', 'numbers']
    ).map((name) => (
      <Checkbox
        index={`cb-${name}`}
        key={name}
        name={name.charAt(0).toUpperCase() + name.slice(1)}
        isChecked={checkedState[name as keyof typeof checkedState]}
        onCheckboxChange={() =>
          handleOnChange(name as keyof typeof checkedState)
        }
        disabled={false}
      />
    ));
  };

  return (
    <div className="text-neutral-400 font-robotomono">
      <div className="mb-12 p-4 password-container bg-gray-800 rounded-lg">
        <div className="flex justify-between items-center w-full">
          <pre
            className="outline-none font-robotomono text-lg whitespace-pre-wrap break-words overflow-x-auto w-full max-w-[calc(100%-3rem)] mr-4 focus:bg-gray-800"
            title="generated password"
            id="password-value"
            ref={passwordRef}
            contentEditable
            suppressContentEditableWarning={true}
          >
            {password}
          </pre>

          <div
            className="leading-tight shadow-md hover:text-blue-500 active:text-blue-500 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
            title="Copy Password"
            onClick={handleOnCopy}
          >
            <i className="fa fa-copy fa-xl" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <label>Password Mode</label>

      <div id="radio-password" className="flex items-center mt-1 mb-12 gap-8">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-6 h-6 text-red-600"
            id="password"
            value="password"
            checked={passwordMode === PasswordMode.Password}
            onChange={() => handlePasswordModeChange(PasswordMode.Password)}
          />

          <span className="ml-2">Password</span>
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            className="w-6 h-6 text-red-600"
            id="passphrase"
            value="passphrase"
            checked={passwordMode === PasswordMode.Passphrase}
            onChange={() => handlePasswordModeChange(PasswordMode.Passphrase)}
          />

          <span className="ml-2">Passphrase</span>
        </label>
      </div>

      <label className="font-robotomono">
        {passwordMode === PasswordMode.Password ? 'Password Length' : 'Words'}
      </label>

      <div className="slider mb-12 mt-1">
        <input
          type="range"
          className="w-full"
          min={passwordMode === PasswordMode.Password ? 12 : 3}
          max={passwordMode === PasswordMode.Password ? 100 : 10}
          value={length}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            const passwordLength = parseInt(ev.target.value);

            setLength(passwordLength);

            try {
              const newPassword = randomPassword(
                passwordMode,
                passwordLength,
                lowercase,
                uppercase,
                checkedState.numbers,
                checkedState.symbols,
                checkedState.capitalize
              );

              setPassword(newPassword);
            } catch (error) {
              console.error('Error generating password');
            }
          }}
        />

        <div>{length}</div>
      </div>

      <div className="mb-12 mt-1">{getCheckboxes()}</div>

      <div className="copy-container">
        <button
          type="button"
          onClick={handleOnGenerate}
          className="py-4 px-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none rounded-lg"
        >
          Generate
          <div className="ml-3">
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </div>
        </button>
      </div>

      <div
        id="password-strength"
        className="mt-20 relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-800"
      >
        <a href="#" className="block w-full h-full">
          <div className="px-4 py-4">
            <p className="ml-2 text-lg text-gray-700 border-gray-200 dark:text-white text-center">
              Password Strength:{' '}
              <span
                className={`${
                  passwordStrength === 'Weak'
                    ? 'text-red-500 w-1/3'
                    : passwordStrength === 'Moderate'
                    ? 'text-yellow-500 w-2/3'
                    : 'text-green-500 w-full'
                }`}
              >
                {passwordStrength}
              </span>
            </p>
          </div>

          <div className="w-full h-3 bg-gray-100">
            <div
              className={`h-full text-xs text-center text-white ${
                passwordStrength === 'Weak'
                  ? 'bg-red-500 w-1/3'
                  : passwordStrength === 'Moderate'
                  ? 'bg-yellow-500 w-2/3'
                  : 'bg-green-500 w-full'
              }`}
            ></div>
          </div>
        </a>
      </div>
    </div>
  );
};
