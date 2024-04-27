import React, { useEffect, useRef, useState } from 'react';

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

  const [checkedState, setCheckedState] = useState({
    symbols: true,
    numbers: true,
    capitalize: true,
  });

  const passwordRef = useRef<HTMLPreElement>(null);

  const [length, setLength] = useState<number>(defaultLength);

  const [password, setPassword] = useState<string>('');

  const handleOnCopy = async () => {
    console.log('hai');

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
  }, [
    passwordMode,
    length,
    uppercase,
    lowercase,
    checkedState.numbers,
    checkedState.symbols,
    checkedState.capitalize,
  ]);

  const handleOnChange = (checkedName: keyof typeof checkedState) => {
    setCheckedState((prev) => ({ ...prev, [checkedName]: !prev[checkedName] }));
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
      <div className="mb-8 p-4 password-container bg-gray-800">
        <div className="flex justify-between items-center w-full">
          <pre
            className="outline-none font-robotomono text-xl whitespace-pre-wrap break-words overflow-x-auto w-full max-w-[calc(100%-3rem)] mr-4 focus:text-white focus:bg-gray-800"
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
      <div id="radio-password" className="flex items-center mt-1 mb-8">
        <input
          type="radio"
          className="form-radio h-4 w-4 text-blue-600 mr-1"
          id="password"
          value="password"
          checked={passwordMode === PasswordMode.Password}
          onChange={() => handlePasswordModeChange(PasswordMode.Password)}
        />

        <label htmlFor="password" className="font-robotomono">
          Password
        </label>

        <input
          type="radio"
          className="form-radio h-4 w-4 text-blue-600 ml-4 mr-1"
          id="passphrase"
          value="passphrase"
          checked={passwordMode === PasswordMode.Passphrase}
          onChange={() => handlePasswordModeChange(PasswordMode.Passphrase)}
        />

        <label htmlFor="passphrase" className="font-robotomono">
          Passphrase
        </label>
      </div>

      <label className="font-robotomono">
        {passwordMode === PasswordMode.Password ? 'Password Length' : 'Words'}
      </label>

      <div className="slider mb-8 mt-1">
        <input
          type="range"
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

      <div className="mb-8 mt-1">{getCheckboxes()}</div>

      <div className="copy-container">
        <button
          type="button"
          className="btn btn-regenerate btn-lg"
          title="Regenerate Password"
          onClick={handleOnGenerate}
        >
          <i className="fa fa-refresh" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
