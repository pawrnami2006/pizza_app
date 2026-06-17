import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/pizzas"
      );

      setPizzas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍕 Available Pizzas</h1>

        <button
          onClick={() => navigate("/create-pizza")}
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
          }}
        >
          Create Your Own Pizza
        </button>

      {pizzas.map((pizza) => (
        <div
          key={pizza._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>{pizza.name}</h2>

          <p>
            <strong>Base:</strong> {pizza.base}
          </p>

          <p>
            <strong>Sauce:</strong> {pizza.sauce}
          </p>

          <p>
            <strong>Cheese:</strong> {pizza.cheese}
          </p>

          <p>
            <strong>Veggies:</strong>{" "}
            {pizza.veggies.join(", ")}
          </p>

          <p>
            <strong>Price:</strong> ₹{pizza.price}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;