const BasketService = require("../services/basketservice");
const CatalogService = require("../services/catalogservice");

// Add Cake To Basket
const addToBasket = async (req, res, next) => {
  try {
    const { cakeId, quantity } = req.body;

    // Validate request
    if (!cakeId || !quantity) {
      return res.status(400).json({
        success: false,
        message: "cakeId and quantity are required",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    // Get cake information from Catalog Service
    const cake = await CatalogService.getCakeById(cakeId);

    // Check whether cake exists
    if (!cake) {
      return res.status(404).json({
        success: false,
        message: "Cake not found",
      });
    }

    // Check availability
    if (!cake.available) {
      return res.status(400).json({
        success: false,
        message: "Cake is currently unavailable",
      });
    }

    // Check stock
    if (cake.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${cake.stock} cakes are available`,
      });
    }

    // Create basket item
    const basketItem = await BasketService.addItem({
      userId: "user1",
      cakeId: cake._id,
      cakeName: cake.name,
      price: cake.price,
      quantity: quantity,
      subtotal: cake.price * quantity,
    });

    res.status(201).json({
      success: true,
      message: "Cake added to basket successfully",
      data: basketItem,
    });
  } catch (error) {
    next(error);
  }
};


// Get Basket
const getBasket = async (req, res, next) => {
  try {
    const basket = await BasketService.getBasket();

    const totalAmount = basket.reduce(
      (total, item) => total + item.subtotal,
      0
    );

    res.status(200).json({
      success: true,
      count: basket.length,
      totalAmount: totalAmount,
      data: basket,
    });
  } catch (error) {
    next(error);
  }
};


// Update Basket Quantity
const updateBasket = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity) {
      return res.status(400).json({
        success: false,
        message: "Quantity is required",
      });
    }

    if (quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0",
      });
    }

    const basket = await BasketService.updateBasket(
      req.params.basketId,
      quantity
    );

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Basket quantity updated successfully",
      data: basket,
    });
  } catch (error) {
    next(error);
  }
};


// Remove Item From Basket
const removeFromBasket = async (req, res, next) => {
  try {
    const basket = await BasketService.removeItem(
      req.params.basketId
    );

    if (!basket) {
      return res.status(404).json({
        success: false,
        message: "Basket item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from basket successfully",
    });
  } catch (error) {
    next(error);
  }
};


// Clear Basket
const clearBasket = async (req, res, next) => {
  try {
    await BasketService.clearBasket();

    res.status(200).json({
      success: true,
      message: "Basket cleared successfully",
    });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  addToBasket,
  getBasket,
  updateBasket,
  removeFromBasket,
  clearBasket,
};