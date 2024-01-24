const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserByID,
  addUser,
  addAdmin,
  deleteUser,
  updateUser,
  loginUser,
  switchToAdmin,
  getSellers,
  addSeller,
  getAdmins,
  getAdminByID,
} = require("../controllers/UsersController");

const isAuthenticated = require("../middlewares/isAuth");

router.get("/", getAllUsers);
router.get("/getByID/:id", getUserByID);
router.get("/getAdmin", getAdmins);
router.get("/getAdminById/:id", getAdminByID);
router.post("/addUser", addUser);
router.post("/addAdmin", addAdmin);
router.post("/loginUser", loginUser);
router.put(
  "/updateUser/:id",
  isAuthenticated(["organizer", "admin"]),
  updateUser
);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
