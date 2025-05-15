const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(__dirname, "../data/users.json");

const readData = async () => {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data || "[]");
};

const writeData = async (data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

exports.getUsers = async (req, res) => {
  const users = await readData();
  res.json(users);
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

exports.addUser = async (req, res) => {
  console.log("Received user:", req.body);
  console.log("in add user");
  const users = await readData();
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  await writeData(users);
  res.status(201).json(newUser);
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
