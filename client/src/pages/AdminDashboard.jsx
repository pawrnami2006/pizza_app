import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
  <div className="admin-page">

    <div className="admin-header">

      <h1>
        👨‍💼 Admin Dashboard
      </h1>

      <p>
        Manage orders, inventory and
        monitor restaurant operations.
      </p>

    </div>

    <div className="stats-grid">

      <div className="stat-card">
        <h2>🍕</h2>
        <h3>Menu Items</h3>
        <p>4 Available</p>
      </div>

      <div className="stat-card">
        <h2>📦</h2>
        <h3>Orders</h3>
        <p>Manage Orders</p>
      </div>

      <div className="stat-card">
        <h2>💰</h2>
        <h3>Revenue</h3>
        <p>Track Sales</p>
      </div>

    </div>

    <h2 className="section-heading">
      Quick Actions
    </h2>

    <div className="action-grid">

      <Link
        to="/inventory"
        className="action-card"
      >
        🍕
        <h3>Inventory Management</h3>
        <p>
          Manage available pizzas and
          stock information.
        </p>
      </Link>

      <Link
        to="/order-management"
        className="action-card"
      >
        📦
        <h3>Order Management</h3>
        <p>
          View and update customer
          orders.
        </p>
      </Link>

    </div>

  </div>
);
}

export default AdminDashboard;