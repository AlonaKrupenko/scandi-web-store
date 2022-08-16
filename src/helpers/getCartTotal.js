import getPrice from "./getPrice";

const getCartTotal = (list, selectedCurency) => {
  const total = list.reduce((acc, el) => {
    const price = getPrice(el.product, selectedCurency);
    return acc + price.amount * el.quantity;
  }, 0);
  return total.toFixed(2);
};

export default getCartTotal;
