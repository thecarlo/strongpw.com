import { CssClassType } from '@enums/cssClassType';

export const getClassByStrength = (
  strength: string,
  classType: CssClassType
): string => {
  const cssPrefix = classType === CssClassType.Text ? 'text' : 'bg';

  switch (strength) {
    case 'Weak':
      return `${cssPrefix}-red-500`;

    case 'Moderate':
      return `${cssPrefix}-yellow-500`;

    case 'Strong':
      return `${cssPrefix}-green-500`;

    case 'Very Strong':
      return `${cssPrefix}-green-500`;

    default:
      return `${cssPrefix}-red-500`;
  }
};
