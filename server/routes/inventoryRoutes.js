const express = require("express");
const router = express.Router();

const { 
    createInventory,
    getInventory, 
    updateInventory,
   } = require("../controllers/inventoryController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  createInventory
);

router.get(
  "/",
  protect,
  getInventory
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateInventory
);
     
  module.exports = router;
