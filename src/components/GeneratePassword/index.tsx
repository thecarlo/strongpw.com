import React, { useEffect, useRef, useState } from 'react';

import { PasswordMode } from '../../enums/passwordMode';
import { randomPassword } from '../../functions/randomPassword';
import { GeneratePasswordProps } from '../../interfaces/props/generatePasswordProps';
import { Checkbox } from '../Checkbox';

import './styles.scss';

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
        console.error('Failed to copy password', error);
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
      console.error('Failed to generate password', error);
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
    <div className={`generate checkbox-spacing`}>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="password"
            checked={passwordMode === PasswordMode.Password}
            onChange={() => handlePasswordModeChange(PasswordMode.Password)}
          />{' '}
          Password
        </label>

        <label>
          <input
            type="radio"
            value="passphrase"
            checked={passwordMode === PasswordMode.Passphrase}
            onChange={() => handlePasswordModeChange(PasswordMode.Passphrase)}
          />{' '}
          Passphrase
        </label>
      </div>

      <label className="slider-label checkbox-spacing">
        {passwordMode === PasswordMode.Password ? 'Password Length' : 'Words'}
      </label>

      <div className="slider">
        <input
          className="length"
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
              console.error('Error generating password', error);
            }
          }}
        />

        <div className="password-length">{length}</div>
      </div>

      <div className="form-check">{getCheckboxes()}</div>

      <div className="password-container">
        <pre
          className="password-value"
          title="generated password"
          id="password-value"
          ref={passwordRef}
          contentEditable
          suppressContentEditableWarning={true}
        >
          {password}
        </pre>
      </div>

      <div className="copy-container">
        <button
          type="button"
          className="btn btn-copy btn-lg"
          title="Copy Password"
          onClick={handleOnCopy}
        >
          <i className="fa fa-copy" aria-hidden="true"></i> Copy Password
        </button>

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
