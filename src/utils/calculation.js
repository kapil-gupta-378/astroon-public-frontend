export const removeZero = (value) => {
  const result =
    Math.round(parseFloat(value) * Math.pow(10, 10)) / Math.pow(10, 10);

  return result;
};

export const getEligibilityNftPreSale = (tokenCount, lastBuy) => {
  if (tokenCount >= 400 && tokenCount < 1500) return 1;
  if (tokenCount >= 400 && tokenCount < 1500 && lastBuy === 1) return 2;
  if (tokenCount >= 1500 && tokenCount < 3000) return 2;
  if (tokenCount >= 3000 && tokenCount < 4500) return 4;
  if (tokenCount >= 4500 && tokenCount < 6000) return 6;
  if (tokenCount >= 6000 && tokenCount < 7500) return 8;
  if (tokenCount >= 7500) return 10;
};
