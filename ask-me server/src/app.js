const express = require("express");
const cors = require("cors");
require('dotenv').config();
const { connectToServer } = require("./utils/db-accessor");
const userRoutes = require("./routes/userRoutes.js")
const categoryRoutes = require('./routes/categoryRoutes.js');
const PORT = 5000;


const app = express();
app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Welcome to the API! Use /api/users to access the users endpoint.");
});

app.use("/api/users", userRoutes);
app.use('/api/categories', categoryRoutes);

app.use((req, res, next) => {
  res.status(404).send("Route Not Found!!");
});

const init = async () => {
  try {
    await connectToServer();
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to DB:", err);
    process.exit(1); // עצירה במקרה של כישלון
  }
};

init();
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });