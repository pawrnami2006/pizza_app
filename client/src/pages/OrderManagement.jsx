import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderManagement.css";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://pizzahub-backend-xgxj.onrender.com/api/orders",
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

  const updateStatus = async (
    orderId,
    orderStatus
  ) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `https://pizzahub-backend-xgxj.onrender.com/api/orders/${orderId}/status`,
        {
          orderStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
  <div className="orders-admin-page">

    <h1 className="orders-admin-title">
      📦 Order Management
    </h1>

    <p className="orders-admin-subtitle">
      Track and update customer orders.
    </p>

    <div className="orders-admin-grid">

      {orders.map((order) => (

        <div
          key={order._id}
          className="admin-order-card"
        >

          <div className="order-icon">
            🍕
          </div>

          <h2>
            {order.pizza?.name}
          </h2>

          <p>
            <strong>Customer:</strong>
            <br />
            {order.user?.email}
          </p>

          <p>
            <strong>Amount:</strong>
            <br />
            ₹{order.totalPrice}
          </p>

          <div
            className={
              order.paymentStatus === "paid"
                ? "payment-status paid"
                : "payment-status pending"
            }
          >
            {order.paymentStatus
              ?.replace(/\b\w/g, c =>
                c.toUpperCase()
              )}
          </div>

          <div className="order-status">
            {order.orderStatus
              ?.replaceAll("_", " ")
              .replace(/\b\w/g, c =>
                c.toUpperCase()
              )}
          </div>

          <select
            className="status-select"
            value={order.orderStatus}
            onChange={(e) =>
              updateStatus(
                order._id,
                e.target.value
              )
            }
          >
            <option value="order_received">
              Order Received
            </option>

            <option value="in_kitchen">
              In Kitchen
            </option>

            <option value="sent_to_delivery">
              Sent To Delivery
            </option>

            <option value="delivered">
              Delivered
            </option>
          </select>

        </div>

      ))}

    </div>

  </div>
);

}

export default OrderManagement;