import { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div className="orders-page">

    <h1 className="orders-title">
      My Orders
    </h1>

    <div className="orders-grid">

      {orders.map((order) => (

        <div
          key={order._id}
          className="order-card"
        >

          <div className="order-image">
            🍕
          </div>

          <h2>
            {order.pizza?.name}
          </h2>

          <p>
            Quantity: {order.quantity}
          </p>

          <p>
            ₹{order.totalPrice}
          </p>

          <div
            className={order.paymentStatus
              ?.replace(/\b\w/g, (char) => char.toUpperCase())}
          >
            {order.paymentStatus}
          </div>

          <div className="status-badge">
            {order.orderStatus
              ?.replaceAll("_", " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </div>

        </div>

      ))}

    </div>

  </div>
);
}

export default MyOrders;