const Basket = require("../models/Basket");

const addItem = async (item) => {
  return await Basket.create(item);
};

const getBasket = async () => {
  return await Basket.find();
};

const updateBasket = async (id, quantity) => {
  const basket = await Basket.findById(id);

  if (!basket) return null;

  basket.quantity = quantity;

  basket.subtotal = basket.price * quantity;

  await basket.save();

  return basket;
};

const removeItem = async (id) => {
  return await Basket.findByIdAndDelete(id);
};

const clearBasket = async () => {
  return await Basket.deleteMany();
};

module.exports = {
  addItem,
  getBasket,
  updateBasket,
  removeItem,
  clearBasket,
};