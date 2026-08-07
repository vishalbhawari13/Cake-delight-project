const Cake = require("../model/Cake");

const createCake = async (cakeData) => {
  return await Cake.create(cakeData);
};

const getAllCakes = async () => {
  return await Cake.find();
};

const getCakeById = async (id) => {
  return await Cake.findById(id);
};

const updateCake = async (id, data) => {
  return await Cake.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteCake = async (id) => {
  return await Cake.findByIdAndDelete(id);
};

const searchCake = async (keyword) => {
  return await Cake.find({
    name: {
      $regex: keyword,
      $options: "i",
    },
  });
};

module.exports = {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake,
  searchCake,
};