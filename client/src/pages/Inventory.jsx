import { useEffect, useState } from "react";
import axios from "axios";

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
        "http://localhost:5000/api/inventory",
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
        `http://localhost:5000/api/inventory/${id}`,
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
      "http://localhost:5000/api/inventory",
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

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Management</h1>
        <div
  style={{
    border: "1px solid gray",
    padding: "20px",
    marginBottom: "20px",
  }}
>
  <h3>Add Inventory Item</h3>

  <input
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
    type="number"
    placeholder="Stock"
    value={stock}
    onChange={(e) =>
      setStock(e.target.value)
    }
  />

  <br />
  <br />

  <button onClick={addInventory}>
    Add Inventory
  </button>
</div>
      {inventory.map((item) => (
        <div
          key={item._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{item.itemName}</h3>

          <p>
            Category: {item.category}
          </p>
          <p>
            Unit: {item.unit}
          </p>
          <p>
            Stock: {item.stock}
          </p>

          <button
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
  );
}

export default Inventory;