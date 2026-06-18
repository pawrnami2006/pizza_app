import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreatePizza.css";
import pizzaPreview from "../assets/pizza-preview.png";
import thinCrustPreview from "../assets/thin-crust-preview.png";
import handTossedPreview from "../assets/hand-tossed-preview.png";
import cheeseBurstPreview from "../assets/cheese-burst-preview.png";
import stuffedCrustPreview from "../assets/stuffed-crust-preview.png";
import wholeWheatPreview from "../assets/whole-wheat-preview.png";

function CreatePizza() {
  const navigate = useNavigate();
  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [price, setPrice] = useState(0);

  let pizzaImage = thinCrustPreview;

if (base === "🍕 Hand Tossed") {
  pizzaImage = handTossedPreview;
}

if (base === "🧀 Cheese Burst") {
  pizzaImage = cheeseBurstPreview;
}

if (base === "🥖 Stuffed Crust") {
  pizzaImage = stuffedCrustPreview;
}

if (base === "🌾 Whole Wheat") {
  pizzaImage = wholeWheatPreview;
}

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
  <div className="builder-page">

    <h1 className="builder-title">
      Build Your Pizza
    </h1>

    <p className="builder-subtitle">
      Customize every ingredient exactly the way you like it.
    </p>

    <div className="builder-container">

      <div className="builder-left">

        <h3>Choose Base</h3>

        <div className="option-grid">

          {[
            "🍞 Thin Crust",
            "🍕 Hand Tossed",
            "🧀 Cheese Burst",
            "🥖 Stuffed Crust",
            "🌾 Whole Wheat",
          ].map((item) => (

            <div
              key={item}
              className={
                base === item
                  ? "option-card active"
                  : "option-card"
              }
              onClick={() =>
                setBase(item)
              }
            >
              {item}
            </div>

          ))}

        </div>

        <h3>Choose Sauce</h3>

        <div className="option-grid">

          {[
            "🍅 Tomato",
            "🔥 BBQ",
            "🌶️ Peri Peri",
            "🧄 White Garlic",
            "🌮 Chipotle",
          ].map((item) => (

            <div
              key={item}
              className={
                sauce === item
                  ? "option-card active"
                  : "option-card"
              }
              onClick={() =>
                setSauce(item)
              }
            >
              {item}
            </div>

          ))}

        </div>

        <h3>Choose Cheese</h3>

        <div className="option-grid">

          {[
            "🧀 Mozzarella",
            "🟨 Cheddar",
            "🥛 Parmesan",
          ].map((item) => (

            <div
              key={item}
              className={
                cheese === item
                  ? "option-card active"
                  : "option-card"
              }
              onClick={() =>
                setCheese(item)
              }
            >
              {item}
            </div>

          ))}

        </div>

        <h3>Choose Veggies</h3>

        <div className="option-grid">

          {[
            "🧅 Onion",
            "🫑 Capsicum",
            "🌽 Corn",
            "🍄 Mushroom",
          ].map((item) => (

            <div
              key={item}
              className={
                veggies.includes(item)
                  ? "option-card active"
                  : "option-card"
              }
              onClick={() =>
                handleVeggieChange(item)
              }
            >
              {item}
            </div>

          ))}

        </div>

      </div>

      <div className="builder-right">

        <div className="summary-card">

          <img
            src={pizzaImage}
            alt="Pizza Preview"
            className="pizza-preview"
          />

          <h2>Your Pizza</h2>

          <p>
            <strong>Base:</strong> {base || "-"}
          </p>

          <p>
            <strong>Sauce:</strong> {sauce || "-"}
          </p>

          <p>
            <strong>Cheese:</strong> {cheese || "-"}
          </p>

          <p>
            <strong>Veggies:</strong>{" "}
            {veggies.join(", ") || "-"}
          </p>

          <div className="builder-price">
            ₹{price}
          </div>

          <button
            className="payment-btn"
            onClick={handlePayment}
          >
            Proceed To Payment
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default CreatePizza;