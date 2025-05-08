

const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes.js")

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api/users to access the users endpoint.");
  });

app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});