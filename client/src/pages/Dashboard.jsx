import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import logo from "../assets/logo.png";
import pizzaHero from "../assets/pizza-hero.jpg";
import vegSupremeImg from "../assets/veg-supreme.png";
import margheritaImg from "../assets/margherita.png";
import farmhouseImg from "../assets/farmhouse.png";
import cheeseBurstImg from "../assets/cheese-burst.png";

function Dashboard() {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  const pizzaImages = {
  "Veg Supreme": vegSupremeImg,
  Margherita: margheritaImg,
  Farmhouse: farmhouseImg,
  "Cheese Burst Deluxe": cheeseBurstImg,
};

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
  <div className="dashboard">

    <nav className="navbar">

      <div className="navbar-logo">

        <img
          src={logo}
          alt="PizzaHub"
          className="navbar-logo-img"
        />

        <span className="logo-text">
          PizzaHub
  </span>

</div>

     <div className="nav-links">

  <button>
    Dashboard
  </button>

  <button
    onClick={() =>
      navigate("/create-pizza")
    }
  >
    Create Pizza
  </button>

  <button
    onClick={() =>
      navigate("/orders")
    }
  >
    My Orders
  </button>

  <button
    onClick={() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }}
  >
    Logout
  </button>

</div> 

    </nav>

    <section className="hero">

  <div className="hero-left">

    <h1>
      Build Your
      <br />
      Perfect Pizza
    </h1>

    <p>
      Fresh. Fast. Delicious.
    </p>

    <button
      className="create-btn"
      onClick={() =>
        navigate("/create-pizza")
      }
    >
      Create Your Own Pizza
    </button>

  </div>

  <div className="hero-right">

    <img
      src={pizzaHero}
      alt="Pizza"
      className="hero-image"
    />

  </div>

</section>

<h2 className="section-title">
  Chef's Specials
</h2>

    <div className="pizza-grid">

      {pizzas.map((pizza) => (

        <div
          key={pizza._id}
          className="pizza-card"
        >
          <img
            src={pizzaImages[pizza.name]}
            alt={pizza.name}
            className="pizza-card-image"
          />

          <h2>{pizza.name}</h2>

          <p>
            <strong>Base:</strong>{" "}
            {pizza.base}
          </p>

          <p>
            <strong>Sauce:</strong>{" "}
            {pizza.sauce}
          </p>

          <p>
            <strong>Cheese:</strong>{" "}
            {pizza.cheese}
          </p>

          <p>
            <strong>Veggies:</strong>{" "}
            {pizza.veggies.join(", ")}
          </p>

          <div className="price">
            ₹{pizza.price}
          </div>

          <button
            className="order-btn"
            onClick={() =>
              navigate("/create-pizza")
          }
          > 
            Customize & Order
          </button>

        </div>

      ))}

    </div>

  </div>
);
}

export default Dashboard;