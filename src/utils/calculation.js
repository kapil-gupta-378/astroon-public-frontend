export const removeZero = (value) => {
  const result =
    Math.round(parseFloat(value) * Math.pow(10, 10)) / Math.pow(10, 10);

  return result;
};
