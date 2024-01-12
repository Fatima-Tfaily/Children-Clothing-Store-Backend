const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserByID,
  addClient,
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
router.get("/getSellers", getSellers);
router.get("/getAdmin", getAdmins);
router.get("/getAdminById/:id", getAdminByID);
router.post("/addClient", addClient);
router.post("/addAdmin", addAdmin);
router.post("/loginUser", loginUser);
router.post("/AddSeller", addSeller);
router.put(
  "/updateUser/:id",
  isAuthenticated(["organizer", "admin"]),
  updateUser
);
router.put(
  "/switchToAdmin/:id",
  isAuthenticated(["admin", "organizer"]),
  switchToAdmin
);
router.delete("/deleteUser/:id", isAuthenticated(["admin"]), deleteUser);

module.exports = router;
