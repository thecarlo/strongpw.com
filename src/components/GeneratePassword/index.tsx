/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useRef, useState } from 'react';
import { CssClassType } from '@enums/cssClassType';
import { checkPasswordStrength } from '@functions/checkPasswordStrength';
import { getClassByStrength } from '@functions/checkPasswordStrength/getClassByStrength';
import { getClassNameByStrength } from '@functions/checkPasswordStrength/getClassnameByStrength';
import { estimateCrackTime } from '@functions/estimateCrackTime';

import { PasswordMode } from '../../enums/passwordMode';
import { randomPassword } from '../../functions/randomPassword';
import { GeneratePasswordProps } from '../../interfaces/props/generatePasswordProps';
import { Checkbox } from '../Checkbox';

import './style.scss';

export const GeneratePassword = (props: GeneratePasswordProps) => {
  const { lowercase, uppercase, passwordMode: mode } = props;

  const passphraseDefaultLength = 3;

  const passwordDefaultLength = 12;

  const defaultLength =
    mode === PasswordMode.Password
      ? passwordDefaultLength
      : passphraseDefaultLength;

  const [passwordMode, setPasswordMode] = useState<PasswordMode>(mode);

  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const [length, setLength] = useState<number>(defaultLength);

  const [checkedState, setCheckedState] = useState({
    symbols: true,
    numbers: false,
    capitalize: false,
  });

  const passwordRef = useRef<HTMLPreElement>(null);

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
    passwordMode,
    length,
    uppercase,
    lowercase,
    checkedState,
    passwordStrength,
  ]);

  const handleOnChange = (checkedName: keyof typeof checkedState) => {
    setCheckedState((prev) => {
      const newState = { ...prev, [checkedName]: !prev[checkedName] };

      const newPassword = randomPassword(
        passwordMode,
        length,
        lowercase,
        uppercase,
        newState.numbers,
        newState.symbols,
        newState.capitalize
      );

      setPassword(newPassword);

      const strengthResult = checkPasswordStrength(newPassword);

      setPasswordStrength(strengthResult.strength);

      return newState;
    });
  };

  const handlePasswordModeChange = (newMode: PasswordMode) => {
    setPasswordMode(newMode);

    const newLength =
      newMode === PasswordMode.Passphrase
        ? passphraseDefaultLength
        : passwordDefaultLength;

    setLength(newLength);

    const newState = {
      numbers: newMode === PasswordMode.Password,
      symbols: newMode === PasswordMode.Password,
      capitalize: false,
    };

    setCheckedState((prev) => ({
      ...prev,
      ...newState,
    }));

    const newPassword = randomPassword(
      newMode,
      newLength,
      lowercase,
      uppercase,
      newState.numbers,
      newState.symbols,
      newState.capitalize
    );

    setPassword(newPassword);

    const strengthResult = checkPasswordStrength(newPassword);

    setPasswordStrength(strengthResult.strength);
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
      <div className="p-4 password-container bg-gray-800">
        <div className="flex justify-between items-center w-full">
          <pre
            className="outline-none font-robotomono text-lg whitespace-pre-wrap break-words overflow-x-auto w-full max-w-[calc(100%-3rem)] mr-4 focus:bg-gray-800"
            id="password-value"
            ref={passwordRef}
            contentEditable
            suppressContentEditableWarning={true}
            title="generated password"
          >
            {password}
          </pre>

          <div
            className="leading-tight shadow-md hover:text-blue-500 active:text-blue-600 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out"
            title="Copy Password"
            onClick={handleOnCopy}
          >
            <i className="fa fa-copy fa-xl" aria-hidden="true"></i>
          </div>
        </div>
      </div>

      <div
        id="password-strength-indicator"
        className="relative w-full overflow-hidden bg-white shadow-lg dark:bg-gray-800 mb-12"
        title={`Password Strength: ${passwordStrength}`}
      >
        <div className="w-full h-2 bg-gray-100">
          <div
            className={`h-full text-xs text-center text-white ${getClassNameByStrength(
              passwordStrength
            )}`}
          ></div>
        </div>
      </div>

      <label>Password Mode</label>

      <div
        id="radio-password"
        className="flex items-center mt-1 mb-12 gap-4 sm:gap-8"
      >
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
      </div>

      <label className="font-robotomono">
        {passwordMode === PasswordMode.Password ? 'Password Length' : 'Words'}
      </label>

      <div className="slider mb-12 mt-1">
        <input
          type="range"
          className="w-full"
          min={passwordMode === PasswordMode.Password ? 11 : 3}
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

              const strengthResult = checkPasswordStrength(newPassword);

              setPasswordStrength(strengthResult.strength);
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
          className="py-4 px-2 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 active:bg-blue-800 active:text-gray-500 text-white w-full transition ease-in duration-200 text-center text-lg font-semibold shadow-md focus:outline-none rounded-lg mb-12"
        >
          Generate
          <div className="ml-3">
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </div>
        </button>
      </div>

      <div
        id="indicator"
        className="relative w-full p-6 overflow-hidden shadow-lg rounded-xl md:w-80 dark:bg-gray-800 mx-auto mt-16 mb-12"
      >
        <div className="flex items-center justify-between my-0 text-white rounded">
          <span
            title="Password Strength"
            className={`p-2 ${getClassByStrength(
              passwordStrength,
              CssClassType.Background
            )} rounded-lg`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
              <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415" />
            </svg>
          </span>

          <div className="flex flex-col items-start w-full ml-2 justify-evenly">
            <p
              className={`text-lg ${getClassByStrength(
                passwordStrength,
                CssClassType.Text
              )}`}
            >
              {passwordStrength}
            </p>

            <p className="text-base text-gray-400">Strength</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-white rounded mt-4">
          <span
            className={`p-2 ${getClassByStrength(
              passwordStrength,
              CssClassType.Background
            )} rounded-lg`}
            title="Time to crack password"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
            </svg>
          </span>
          <div className="flex flex-col items-start w-full ml-2 justify-evenly">
            <p
              className={`text-lg ${getClassByStrength(
                passwordStrength,
                CssClassType.Text
              )}`}
            >
              {estimateCrackTime(password)}
            </p>
            <p className="text-base text-gray-400">Time to crack password</p>
          </div>
        </div>
      </div>
    </div>
  );
};
