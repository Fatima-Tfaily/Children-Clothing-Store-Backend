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

router.get("/", getAllUsers);
router.get("/getByID/:id", getUserByID);
router.get("/getSellers", getSellers);
router.get("/getAdmin", getAdmins);
router.get("/getAdminById/:id", getAdminByID);
router.post("/addClient", addClient);
router.post("/addAdmin", addAdmin);
router.post("/loginUser", loginUser);
router.post("/AddSeller", addSeller);
router.put("/updateUser/:id", updateUser);
router.put("/switchToAdmin/:id", switchToAdmin);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
