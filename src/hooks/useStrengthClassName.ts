import { getClassNameByStrength } from '@functions/passwordStrength/getClassnameByStrength';
import { useMemo } from 'react';

export const useStrengthClassName = (strength: string) => {
  return useMemo(() => getClassNameByStrength(strength), [strength]);
};
