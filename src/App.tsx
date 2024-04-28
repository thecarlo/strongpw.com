import React from 'react';

import { GeneratePassword } from './components/GeneratePassword';
import { PasswordMode } from './enums/passwordMode';

export const App = () => {
  return (
    <React.StrictMode>
      <main className="flex flex-col justify-between min-h-screen m-auto max-w-xl text-lg">
        <div>
          <h1 className="mt-20 mb-12 font-robotomono font-semibold text-3xl text-center text-gray-500">
            Strong password generator
          </h1>

          <GeneratePassword
            passwordMode={PasswordMode.Password}
            length={4}
            lowercase={true}
            uppercase={true}
            numbers={true}
            symbols={true}
          />
        </div>

        <div className="mb-10 text-gray-700 text-center text-base hover:text-gray-500">
          <a
            target="_blank"
            className="hover:cursor-pointer"
            href="https://github.com/thecarlo/strongpw.com"
            rel="noreferrer"
            title="Source code on GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>{' '}
          <a
            target="_blank"
            className="hover:cursor-pointer"
            href="https://github.com/thecarlo/strongpw.com"
            rel="noreferrer"
            title="Source code on GitHub"
          >
            Source code
          </a>
        </div>
      </main>
    </React.StrictMode>
  );
};
