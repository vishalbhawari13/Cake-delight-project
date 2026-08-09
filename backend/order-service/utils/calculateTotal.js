const calculateTotal = (items) => {
  return items.reduce((total, item) => {
    return total + item.subtotal;
  }, 0);
};

module.exports = calculateTotal;