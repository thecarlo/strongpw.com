import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { App } from './App';

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('should render the App component', () => {
    const { getByText } = render(<App />);

    expect(getByText(/Strong password generator/i)).toBeInTheDocument();
  });
});
