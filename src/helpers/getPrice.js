const getPrice = (product, selectedCurrency) => {
  return product.prices.find((el) => {
    return el.currency.label === selectedCurrency.label;
  });
};

export default getPrice;
