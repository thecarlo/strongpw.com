/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import '@testing-library/jest-dom';

// @ts-ignore
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
