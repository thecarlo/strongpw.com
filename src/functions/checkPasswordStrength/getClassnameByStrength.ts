export const getClassNameByStrength = (strength: string): string => {
  switch (strength) {
    case 'Weak':
      return 'bg-red-500 w-1/4';

    case 'Moderate':
      return 'bg-yellow-500 w-2/4';

    case 'Strong':
      return 'bg-green-500 w-3/4';

    case 'Very Strong':
      return 'bg-green-500 w-full';

    default:
      return 'bg-red-500 w-1/4';
  }
};
