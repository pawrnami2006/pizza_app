# 🍕 PizzaHub

A full-stack pizza ordering and management system built with the MERN stack.

PizzaHub allows customers to create customized pizzas, place orders, make payments through Razorpay, and track their orders. It also provides an admin panel for inventory management and order processing.

---

## 🚀 Features

### 👤 Customer Features

* User Registration & Login
* JWT Authentication
* Email Verification
* Forgot Password & Reset Password
* Browse Popular Pizzas
* Build Custom Pizza
* Dynamic Pizza Preview
* Razorpay Payment Integration
* Order Tracking
* View Order History

### 🛠️ Admin Features

* Admin Dashboard
* Inventory Management
* Stock Updates
* Order Management
* Update Order Status
* Track Payments

---

## 🏗️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3
* Vite

### Backend

* Node.js
* Express.js
* JWT Authentication
* Nodemailer

### Database

* MongoDB Atlas
* Mongoose

### Payment Gateway

* Razorpay

---

## 📂 Project Structure

```text
pizza_app/
│
├── client/
│   ├── src/
│   ├── assets/
│   ├── pages/
│   └── components/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
│
└── README.md
```

## 📸 Screens

* Dashboard
* Create Pizza
* My Orders
* Admin Dashboard
* Inventory Management
* Order Management

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
cd pizza_app
```

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=
MONGO_URI=

JWT_SECRET=

EMAIL_USER=
EMAIL_PASS=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## 🎯 Future Improvements

* Real-time Order Tracking
* Pizza Recommendation System
* Customer Reviews & Ratings
* Sales Analytics Dashboard
* Coupon & Discount System

---

## 👩‍💻 Author

**Pawrnami Omprakash**

B.Tech Computer Science Engineering Student

Built as a full-stack MERN project for learning authentication, payments, inventory management, and order processing systems.
