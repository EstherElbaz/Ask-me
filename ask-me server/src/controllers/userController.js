const fs = require("fs-extra");
const path = require("path");
const userAccessor = require("../utils/db-userAccessor.js");
const { v4: uuidv4 } = require("uuid");
const { sendWelcomeEmail } = require("../services/mailService.js");


exports.getUsers = async (req, res) => {
  console.log("in try getting users");
  try {
    const users = await userAccessor.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error("Error in getUsers:", error?.message || error);
    console.error("Full error object:", error);
    res.status(500).json({ error: error, });
  }
};

exports.addUser = async (req, res) => {
  console.log("in add user - controller");
  try {
    const user = req.body;

    if (!user || !user.userName || !user.password || !user.fullName || !user.email) {
      return res.status(400).json({ error: "Missing required user fields" });
    }
    const userId = uuidv4();
    console.log(userId);
    user.id = userId;
    await userAccessor.addUser(user);
    await sendWelcomeEmail(user.email,user.fullName);
    res.status(201).json({ message: "User added successfully" });
    
  } catch (err) {
    console.error("❌ Error in controller addUser:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
}

const filePath = path.join(__dirname, "../data/users.json");

const readData = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data || "[]");
};

const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

exports.checkUser = async (req, res) => {
  const email = req.params.email;
  const { password } = req.body;

  const users = await readData();
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send('Invalid credentials');
  }
};

exports.updateUser = async (req, res) => {
  const users = await readData();
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).send("User not found");
  users[index] = { ...users[index], ...req.body };
  await writeData(users);
  res.json(users[index]);
};

exports.deleteUser = async (req, res) => {
  const users = await readData();
  const id = parseInt(req.params.id);
  const filtered = users.filter((u) => u.id !== id);
  await writeData(filtered);
  res.status(204).send();
};


// exports.addUser = async (req, res) => {
//   console.log("Received user:", req.body);
//   console.log("in add user");
//   const users = await readData();
//   const newUser = { id: Date.now(), ...req.body };
//   users.push(newUser);
//   await writeData(users);
//   res.status(201).json(newUser);
// };