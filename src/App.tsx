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
      </main>
    </React.StrictMode>
  );
};
