const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email Error:", error);
  }
};

const sendOrderEmail = async (to, order) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

    console.log("Order email sent successfully");
  } catch (error) {
    console.log("Order Email Error:", error);
  }
};
const sendLowStockEmail = async (
  itemName,
  stock
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
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

    console.log("Low stock email sent");
  } catch (error) {
    console.log(
      "Low Stock Email Error:",
      error
    );
  }
};

module.exports = {
  sendEmail,
  sendOrderEmail,
  sendLowStockEmail,
};