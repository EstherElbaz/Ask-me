const express = require("express");
const router = express.Router();
const {
    getUsers,
    addUser,
    updateUser,
    loginUser,
} = require("../controllers/userController")

router.get("/", getUsers);
router.post("/login", loginUser);
router.post("/", addUser);
router.put("/:id", updateUser);

module.exports = router;