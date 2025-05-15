const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js")
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the API! Use /api/users to access the users endpoint.");
  });

app.use("/api/users", userRoutes);
app.use('/api/categories', categoryRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});