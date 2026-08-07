const express = require("express");

const router = express.Router();

const {
  createCake,
  getAllCakes,
  getCakeById,
  updateCake,
  deleteCake,
  searchCake,
} = require("../controllers/catalogcontroller");

// Search
router.get("/search", searchCake);

// CRUD
router.post("/cakes", createCake);

router.get("/cakes", getAllCakes);

router.get("/cakes/:id", getCakeById);

router.put("/cakes/:id", updateCake);

router.delete("/cakes/:id", deleteCake);

module.exports = router;