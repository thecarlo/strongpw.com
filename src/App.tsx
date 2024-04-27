import React from 'react';

import { GeneratePassword } from './components/GeneratePassword';
import { PasswordMode } from './enums/passwordMode';

export const App = () => {
  return (
    <React.StrictMode>
      <main className="m-auto max-w-xl text-lg">
        <h1 className="mb-12 font-robotomono font-semibold text-3xl text-center text-gray-500 mt-12">
          Strong password generator
        </h1>

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
