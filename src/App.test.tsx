import React from 'react';
import { cleanup, render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { App } from './App';

afterEach(cleanup);
describe('App', () => {
  test('should render the App component', () => {
    const { getByText } = render(<App />);

    getByText(/Strong password generator/i);
  });
});
