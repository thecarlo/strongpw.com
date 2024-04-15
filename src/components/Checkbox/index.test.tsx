import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Checkbox } from './index';

afterEach(cleanup);

describe('Checkbox', () => {
  const changeEvent = jest.fn();

  test('should have checked attribute set to true if checked', () => {
    render(
      <Checkbox
        index={'cb-foo'}
        name="foo checkbox"
        isChecked={true}
        onCheckboxChange={changeEvent}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /foo checkbox/i });

    expect(checkbox).toHaveProperty('checked', true);
  });

  test('should call the onCheckboxChange event when checkbox is clicked', () => {
    const changeEvent = jest.fn();

    render(
      <Checkbox
        index={'cb-foo'}
        name="foo checkbox"
        isChecked={false}
        onCheckboxChange={changeEvent}
      />
    );

    const checkbox = screen.getByRole('checkbox', { name: /foo checkbox/i });

    act(() => {
      fireEvent.click(checkbox);

      expect(changeEvent).toHaveBeenCalledTimes(1);
    });
  });

  test('should set the correct label text', () => {
    const changeEvent = jest.fn();

    render(
      <Checkbox
        index={'cb-foo'}
        name="foo checkbox"
        isChecked={false}
        onCheckboxChange={changeEvent}
      />
    );

    screen.getByLabelText(/foo checkbox/i);
  });
});
