export const rollDie = (): number => {
  const array = new Uint8Array(1);

  crypto.getRandomValues(array);

  return (array[0] % 6) + 1;
};
