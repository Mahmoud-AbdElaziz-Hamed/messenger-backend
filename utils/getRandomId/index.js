export const getRandomId = (digits = 8) =>
  Math.floor(Math.random() * Math.pow(10, digits));
