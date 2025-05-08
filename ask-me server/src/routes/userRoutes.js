const express = require("express");
const router = express.Router();
const {
    getUsers,
    checkUser,
    addUser,
    updateUser,
} = require("../controllers/userController")

router.get("/", getUsers);
router.post("/:email", checkUser);
router.post("/", addUser);
router.put("/:id", updateUser);

module.exports = router;