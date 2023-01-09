export const removeZero = (value) => {
  const result =
    Math.round(parseFloat(value) * Math.pow(10, 10)) / Math.pow(10, 10);

  return result;
};

export const getEligibilityNftPreSale = (tokenCount) => {
  let result = 0;

  if (tokenCount >= 100 && tokenCount <= 300) return (result = 1);
  if (tokenCount >= 301 && tokenCount <= 600) return (result = 2);
  if (tokenCount >= 601 && tokenCount <= 800) return (result = 3);
  if (tokenCount >= 800) return (result = 4);

  return result;
};
