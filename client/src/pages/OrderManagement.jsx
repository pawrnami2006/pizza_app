import { useEffect, useState } from "react";
import axios from "axios";

function OrderManagement() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/orders",
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
        `http://localhost:5000/api/orders/${orderId}/status`,
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
    <div style={{ padding: "20px" }}>
      <h1>Order Management</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h3>{order.pizza?.name}</h3>

          <p>
            Customer:
            {order.user?.email}
          </p>

          <p>
            Amount: ₹{order.totalPrice}
          </p>

          <p>
            Payment:
            {order.paymentStatus}
          </p>

          <p>
            Status:
            {order.orderStatus}
          </p>

          <select
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
              Sent to Delivery
            </option>

            <option value="delivered">
              Delivered
            </option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default OrderManagement;