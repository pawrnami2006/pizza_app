const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    console.log("Email sent:", data);
  } catch (error) {
    console.log("Email Error:", error);
  }
};

const sendOrderEmail = async (to, order) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Pizza Order Placed 🍕",
      html: `
        <h2>Order Confirmed</h2>

        <p>Your pizza order has been placed successfully.</p>

        <p><strong>Order ID:</strong> ${order._id}</p>
        <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>
        <p><strong>Status:</strong> ${order.orderStatus}</p>
      `,
    });

    console.log("Order Email Sent:", data);
  } catch (error) {
    console.log("Order Email Error:", error);
  }
};

const sendLowStockEmail = async (itemName, stock) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_USER,
      subject: "⚠️ Low Stock Alert",
      html: `
        <h2>Inventory Alert</h2>

        <p>
          <strong>${itemName}</strong>
          is running low.
        </p>

        <p>
          Current Stock:
          <strong>${stock}</strong>
        </p>
      `,
    });

    console.log("Low Stock Email Sent:", data);
  } catch (error) {
    console.log("Low Stock Email Error:", error);
  }
};

module.exports = {
  sendEmail,
  sendOrderEmail,
  sendLowStockEmail,
};