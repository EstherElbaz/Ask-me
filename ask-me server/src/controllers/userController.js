const fs = require("fs-extra");
const path = require("path");

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;
require("dotenv").config();


const userAccessor = require("../utils/db-userAccessor.js");
const { sendWelcomeEmail } = require("../services/mailService.js");

exports.getUsers = async (req, res) => {
  try {
    const users = await userAccessor.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error, });
  }
};

exports.loginUser = async (req, res) => {
  console.log("in loginUser in controller");


  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await userAccessor.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found. Please try again." });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log(password, "  ", passwordMatch);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    user.password = null;
    const token = createJWTToken(user.id, user.email);

    return res.status(200).json({ user, token });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

}

exports.addUser = async (req, res) => {
  console.log("in add user - controller");
  try {
    const user = req.body;
    validateUser(user);
    user.id = createUserId();
    user.password = await hashPassword(user.password);

    await userAccessor.addUser(user);
    res.status(201).json({ message: "User added successfully" });
    await sendWelcomeEmail(user.email, user.fullName);

  } catch (err) {
    console.error("Error in controller addUser:", err);
    res.status(500).json({ error: "Failed to add user" });
  }
}

const validateUser = async (user) => {
  if (!user || !user.userName || !user.password || !user.fullName || !user.email) {
    throw new Error("Missing required user fields-validate user func");
  }
  const existingUser = await userAccessor.getUserByEmail(user.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
}

const createUserId = () => uuidv4();

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const createJWTToken = (userId, userEmail) => {
  const token = jwt.sign(
    { id: userId, email: userEmail },
    SECRET_KEY,
    { expiresIn: '8h' }
  );
  return token;
}



const filePath = path.join(__dirname, "../data/users.json");

const readData = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data || "[]");
};

const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
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

// exports.checkUser = async (req, res) => {
//   const email = req.params.email;
//   const { password } = req.body;

//   const users = await readData();
//   const user = users.find(u => u.email === email && u.password === password);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('Invalid credentials');
//   }
// };
