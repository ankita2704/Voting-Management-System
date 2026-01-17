const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./db");
require("dotenv").config();

app.use(cors()); 
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Routes
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
