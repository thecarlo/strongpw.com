export const shufflePassword = (password: string): string => {
  const array = password.split('');

  // Function to check if the shuffled array has consecutive identical elements
  const hasConsecutiveDuplicates = (arr: string[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        return true;
      }
    }

    return false;
  };

  // Attempt to shuffle until there are no consecutive duplicates
  let shuffled = false;

  while (!shuffled) {
    const randomValues = new Uint32Array(array.length);

    crypto.getRandomValues(randomValues);

    for (let i = array.length - 1; i > 0; i--) {
      const j = randomValues[i] % (i + 1);

      [array[i], array[j]] = [array[j], array[i]];
    }

    if (!hasConsecutiveDuplicates(array)) {
      shuffled = true;
    }
  }

  return array.join('');
};
