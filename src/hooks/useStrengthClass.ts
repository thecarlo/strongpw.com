import { CssClassType } from '@enums/cssClassType';
import { getClassByStrength } from '@functions/passwordStrength/getClassByStrength';
import { useMemo } from 'react';

export const useStrengthClass = (strength: string, type: CssClassType) => {
  return useMemo(() => getClassByStrength(strength, type), [strength, type]);
};
