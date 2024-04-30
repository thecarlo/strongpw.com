import { CssClassType } from '@enums/cssClassType';
import { describe, expect, it } from 'vitest';

import { getClassByStrength } from './getClassByStrength';

describe('getClassByStrength', () => {
  describe('with Text class type', () => {
    it('returns text-red-500 for Weak', () => {
      const result = getClassByStrength('Weak', CssClassType.Text);

      expect(result).toBe('text-red-500');
    });

    it('returns text-yellow-500 for Moderate', () => {
      const result = getClassByStrength('Moderate', CssClassType.Text);

      expect(result).toBe('text-yellow-500');
    });

    it('returns text-green-500 for Strong', () => {
      const result = getClassByStrength('Strong', CssClassType.Text);

      expect(result).toBe('text-green-500');
    });

    it('returns text-green-500 for Very Strong', () => {
      const result = getClassByStrength('Very Strong', CssClassType.Text);

      expect(result).toBe('text-green-500');
    });

    it('returns text-red-500 for unknown strength', () => {
      const result = getClassByStrength('Unknown', CssClassType.Text);

      expect(result).toBe('text-red-500');
    });
  });

  describe('with Background class type', () => {
    it('returns bg-red-500 for Weak', () => {
      const result = getClassByStrength('Weak', CssClassType.Background);

      expect(result).toBe('bg-red-500');
    });

    it('returns bg-yellow-500 for Moderate', () => {
      const result = getClassByStrength('Moderate', CssClassType.Background);

      expect(result).toBe('bg-yellow-500');
    });

    it('returns bg-green-500 for Strong', () => {
      const result = getClassByStrength('Strong', CssClassType.Background);

      expect(result).toBe('bg-green-500');
    });

    it('returns bg-green-500 for Very Strong', () => {
      const result = getClassByStrength('Very Strong', CssClassType.Background);

      expect(result).toBe('bg-green-500');
    });

    it('returns bg-red-500 for unknown strength', () => {
      const result = getClassByStrength('Unknown', CssClassType.Background);

      expect(result).toBe('bg-red-500');
    });
  });
});
