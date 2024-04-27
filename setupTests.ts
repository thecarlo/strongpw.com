/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import '@testing-library/jest-dom';

// @ts-ignore
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

const mockClipboard = {
  writeText: vi.fn(),
};

Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
  configurable: true,
});

afterEach(() => {
  cleanup();

  mockClipboard.writeText.mockClear();
});
