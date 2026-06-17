import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePizza() {
  const navigate = useNavigate();
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [price, setPrice] = useState(0);

  const [veggies, setVeggies] = useState([]);

  const handleVeggieChange = (veggie) => {
    if (veggies.includes(veggie)) {
      setVeggies(
        veggies.filter((v) => v !== veggie)
      );
    } else {
      setVeggies([...veggies, veggie]);
    }
  };

  const calculatePrice = () => {
  let total = 200;

  // Base
  if (base === "Thin Crust") total += 50;
  if (base === "Hand Tossed") total += 70;
  if (base === "Cheese Burst") total += 100;
  if (base === "Stuffed Crust") total += 120;
  if (base === "Whole Wheat") total += 60;
  // Sauce
  if (sauce === "Tomato") total += 20;
  if (sauce === "BBQ") total += 30;
  if (sauce === "Peri Peri") total += 40;
  if (sauce === "White Garlic") total += 35;
  if (sauce === "Chipotle") total += 45;
  // Cheese
  if (cheese === "Mozzarella") total += 50;
  if (cheese === "Cheddar") total += 70;
  if (cheese === "Parmesan") total += 90;

  // Veggies
  total += veggies.length * 20;

  return total;
};
useEffect(() => {
  setPrice(calculatePrice());
}, [base, sauce, cheese, veggies]);

  const handlePayment = async () => {
  try {
    // Create Pizza
    const pizzaRes = await axios.post(
      "http://localhost:5000/api/pizzas",
      {
        name: `${base} ${cheese} Pizza`,
        base,
        sauce,
        cheese,
        veggies,
        price,
      }
    );

    const pizzaId = pizzaRes.data.pizza._id;

    // Get Razorpay Key
    const keyRes = await axios.get(
      "http://localhost:5000/api/payment/key"
    );

    const key = keyRes.data.key;

    // Create Razorpay Order
    const orderRes = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: price,
      }
    );

    const razorpayOrder =
      orderRes.data.order;

    const options = {
      key,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: "Pizza App",
      description: "Pizza Order",
      order_id: razorpayOrder.id,

      handler: async function () {
        const token =
          localStorage.getItem("token");

        await axios.post(
          "http://localhost:5000/api/orders",
          {
            pizza: pizzaId,
            quantity: 1,
            totalPrice: price,
            razorpayOrderId:
              razorpayOrder.id,
            paymentStatus: "paid",
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Payment Successful 🍕"
        );

        navigate("/orders");
      },
    };

    const razor = new window.Razorpay(
      options
    );

    razor.open();
  } catch (error) {
    console.log(error);
    alert("Payment Failed");
  }
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>🍕 Build Your Pizza</h1>

      <h3>Choose Base</h3>

      <select
        value={base}
        onChange={(e) => setBase(e.target.value)}
      >
        <option value="">Select Base</option>
        <option>Thin Crust</option>
        <option>Hand Tossed</option>
        <option>Cheese Burst</option>
        <option>Stuffed Crust</option>
        <option>Whole Wheat</option>
      </select>

      <h3>Choose Sauce</h3>

      <select
        value={sauce}
        onChange={(e) => setSauce(e.target.value)}
      >
        <option value="">Select Sauce</option>
        <option>Tomato</option>
        <option>BBQ</option>
        <option>Peri Peri</option>
        <option>White Garlic</option>
        <option>Chipotle</option>
      </select>

      <h3>Choose Cheese</h3>

      <select
        value={cheese}
        onChange={(e) => setCheese(e.target.value)}
      >
        <option value="">Select Cheese</option>
        <option>Mozzarella</option>
        <option>Cheddar</option>
        <option>Parmesan</option>
      </select>

      <h3>Choose Veggies</h3>

      <label>
        <input
          type="checkbox"
          onChange={() =>
            handleVeggieChange("Onion")
          }
        />
        Onion
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          onChange={() =>
            handleVeggieChange("Capsicum")
          }
        />
        Capsicum
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          onChange={() =>
            handleVeggieChange("Corn")
          }
        />
        Corn
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          onChange={() =>
            handleVeggieChange("Mushroom")
          }
        />
        Mushroom
      </label>

      <br />
      <br />
      <h2>Total Price: ₹{price}</h2>
      <br />
      <button onClick={handlePayment}>
        Proceed To Payment
      </button>
    </div>
  );
}

export default CreatePizza;