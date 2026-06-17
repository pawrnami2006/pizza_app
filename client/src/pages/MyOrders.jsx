import { useEffect, useState } from "react";
import axios from "axios";

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
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{order.pizza?.name}</h3>

          <p>
            Quantity: {order.quantity}
          </p>

          <p>
            Price: ₹{order.totalPrice}
          </p>

          <p>
            Status: {order.orderStatus}
          </p>

          <p>
            Payment: {order.paymentStatus}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;