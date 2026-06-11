const express = require("express");
const router = express.Router();

const {
  createInventory,
  getInventory,
  updateInventory,
} = require("../controllers/inventoryController");

router.post("/", createInventory);
router.get("/", getInventory);
router.put("/:id", updateInventory);

module.exports = router;