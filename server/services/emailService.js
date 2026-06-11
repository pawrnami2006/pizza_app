const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
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

module.exports = {
  sendEmail,
  sendOrderEmail,
};