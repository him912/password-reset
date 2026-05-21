const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connetDB = require("./server/config/db");

dotenv.config();

connetDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log("Request Body:", req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Password-reset MVC API");
});


const authRoutes = require("./server/routes/authRoutes");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

console.log(`PORT URI: ${process.env.PORT}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
