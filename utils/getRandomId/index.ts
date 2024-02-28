export const getRandomId = (digit = 8) => {
  let id: string;
  do {
    const randomNumber: number = Math.floor(
      Math.random() * Math.pow(10, digit)
    );
    id = randomNumber.toString();
  } while (id.length !== digit);
  return parseInt(id);
};
