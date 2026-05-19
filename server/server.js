const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connetDB = require("./config/db");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

connetDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Recipes MVC API");
});

app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 3000;

console.log(`PORT URI: ${process.env.PORT}`);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});