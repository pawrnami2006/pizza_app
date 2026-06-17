import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <br />

      <Link to="/inventory">
        <button>
          Inventory Management
        </button>
      </Link>

      <br />
      <br />

      <Link to="/order-management">
        <button>
          Order Management
        </button>
      </Link>
    </div>
  );
}

export default AdminDashboard;