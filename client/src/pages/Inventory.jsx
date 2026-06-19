import { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [stock, setStock] = useState("");

  const fetchInventory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://pizzahub-backend-xgxj.onrender.com/api/inventory",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInventory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStock = async (id, stock) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://pizzahub-backend-xgxj.onrender.com/api/inventory/${id}`,
        {
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchInventory();
    } catch (error) {
      console.log(error);
    }
  };

  const addInventory = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      "https://pizzahub-backend-xgxj.onrender.com/api/inventory",
      {
        itemName,
        category,
        unit,
        stock,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Inventory Added");

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchInventory();
  }, []);

  const getCategoryIcon = (category) => {
  switch (category?.toLowerCase()) {
    case "cheese":
      return "🧀";

    case "sauce":
      return "🥫";

    case "vegetable":
      return "🌽";

    case "mushroom":
      return "🍄";

    case "spice":
      return "🌶️";

    default:
      return "🍕";
  }
};

  return (
    <div className="inventory-page">
      <h1 className="inventory-title">
        📦 Inventory Management
      </h1>

      <p className="inventory-subtitle">
        Manage ingredients and stock levels.
      </p>
        <div className="inventory-form-card">
  <h3>Add Inventory Item</h3>

  <input
    className="inventory-input"
    type="text"
    placeholder="Item Name"
    value={itemName}
    onChange={(e) =>
      setItemName(e.target.value)
    }
  />

  <br />
  <br />

  <input
    className="inventory-input"
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) =>
      setCategory(e.target.value)
    }
  />

  <br />
  <br />

  <input
    className="inventory-input"
    type="text"
    placeholder="Unit"
    value={unit}
    onChange={(e) =>
      setUnit(e.target.value)
    }
  />

  <br />
  <br />

  <input
    className="inventory-input"
    type="number"
    placeholder="Stock"
    value={stock}
    onChange={(e) =>
      setStock(e.target.value)
    }
  />

  <br />
  <br />

  <button className="inventory-btn" onClick={addInventory}>
    Add Inventory
  </button>
</div>
<div className="inventory-grid">
      {inventory.map((item) => (
        <div
          key={item._id}
          className="inventory-card"
        >
          <h3>
            {getCategoryIcon(item.category)}
            {" "}
            {item.itemName}
          </h3>

          <p>
            Category: {item.category}
          </p>
          <p>
            Unit: {item.unit}
          </p>
          <p
            className={
              item.stock < 20
                ? "low-stock"
                : "good-stock"
          }
        >
          {item.stock < 20
            ? `🔴 Low Stock (${item.stock})`
            : `🟢 In Stock (${item.stock})`}
      </p>

          <button
          className="stock-btn"
            onClick={() =>
              updateStock(
                item._id,
                item.stock + 10
              )
            }
          >
            Add 10 Stock
          </button>
        </div>
      ))}
  </div>

    </div>
  );
}

export default Inventory;