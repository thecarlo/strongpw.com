import React from 'react';

import { GeneratePassword } from './components/GeneratePassword';
import { PasswordMode } from './enums/passwordMode';

import './App.scss';

export const App = () => {
  return (
    <React.StrictMode>
      <main>
        <h1>Strong password generator</h1>

        <GeneratePassword
          passwordMode={PasswordMode.Password}
          length={25}
          lowercase={true}
          uppercase={true}
          numbers={true}
          symbols={true}
        />

        <div className="source">
          <a
            target="_blank"
            href="https://github.com/thecarlo/strongpw.com"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github fa-lg"></i>
          </a>{' '}
          <a
            target="_blank"
            href="https://github.com/thecarlo/strongpw.com"
            rel="noreferrer"
          >
            Source Code
          </a>
        </div>
      </main>
    </React.StrictMode>
  );
};
