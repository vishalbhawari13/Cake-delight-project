const catalogService = require("../services/catalogservice");

// Create Cake
const createCake = async (req, res) => {
  try {
    const { name, description, price, category, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const cake = await catalogService.createCake(req.body);

    res.status(201).json({
      success: true,
      message: "Cake created successfully",
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Cakes
const getAllCakes = async (req, res) => {
  try {
    const cakes = await catalogService.getAllCakes();

    res.status(200).json({
      success: true,
      count: cakes.length,
      data: cakes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Cake By ID
const getCakeById = async (req, res) => {
  try {
    const cake = await catalogService.getCakeById(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cake
const updateCake = async (req, res) => {
  try {
    const cake = await catalogService.updateCake(req.params.id, req.body);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cake updated successfully",
      data: cake,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Cake
const deleteCake = async (req, res) => {
  try {
    const cake = await catalogService.deleteCake(req.params.id);

    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cake deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Cake
const searchCake = async (req, res) => {
  try {
    const keyword = req.query.name || "";

    const cakes = await catalogService.searchCake(keyword);

    res.status(200).json({
      success: true,
      count: cakes.length,
      data: cakes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake,
  searchCake,
};