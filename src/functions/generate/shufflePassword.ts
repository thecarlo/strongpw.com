export const shufflePassword = (password: string): string => {
  const array = password.split('');

  const randomValues = new Uint32Array(array.length);

  crypto.getRandomValues(randomValues);

  for (let i = array.length - 1; i > 0; i--) {
    const j = randomValues[i] % (i + 1);

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join('');
};
