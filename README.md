# 🗳️ Voting Management System

A full-stack **Voting Management System** built using **MERN stack** that allows users to register, log in, vote for candidates, and view vote counts, while admins can manage candidates securely.

---

## 📌 Project Overview

This project is designed to simulate a real-world digital voting system.  
It includes **authentication, role-based access, voting logic, and admin controls**.

The system ensures:
- One vote per user
- Secure access using JWT
- Clean and user-friendly UI

---

## 🚀 Features

### 👤 User Features
- User Registration & Login
- Secure authentication using JWT
- View list of candidates
- Vote for a candidate (only once)
- View voting confirmation

### 🛠️ Admin Features
- Admin login
- Add new candidates
- Update candidate details
- Delete candidates
- View vote counts (sorted by highest votes)

---

## 🧑‍💻 Tech Stack Used

### Frontend
- React.js
- React Router
- CSS (custom styling)
- Fetch API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

---

## 📂 Project Structure

Voting-Management-System/
│
├── backend/
│ ├── routes/
│ ├── models/
│ ├── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── pages/
│ ├── styles/
│ ├── components/
│
└── README.md


---

## ⚙️ How to Run the Project Locally

### Clone the repository
```bash
git clone https://github.com/ankita2704/Voting-Management-System.git

#For Backend Run
cd backend
npm install
npm start

#For Frontend Run
cd frontend
npm install
npm start
