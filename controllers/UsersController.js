const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { generateToken } = require("../extra/generateToken");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

const getAdminByID = async (req, res) => {
  try {
    const adminUser = await User.findOne({ _id: req.params.id, role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ msg: "Admin user not found" });
    }

    res.json(adminUser);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Admin user not found" });
    }

    res.status(500).send("Server Error");
  }
};

const getSellers = async (req, res) => {
  try {
    const users = await User.find({ role: { $regex: /seller/i } });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

const getAdmins = async (req, res) => {
  try {
    const users = await User.find({ role: "admin" });
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(users);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(500).send("Server Error");
  }
};

const addSeller = async (req, res) => {
  try {
    const role = "Seller";
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addClient = async (req, res) => {
  try {
    const role = "client";
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addAdmin = async (req, res) => {
  try {
    const role = "admin";
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hashedPassword,
      phoneNumber,
      role,
    });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const switchToAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    // Update the user's role to 'admin'
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: "admin" } },
      { new: true }
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res
        .status(404)
        .json({ msg: `User with id = ${userId} not found.` });
    }

    return res.status(200).json({
      success: true,
      message: `User with id ${userId} switched to admin successfully.`,
      data: updatedUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: `Error while trying to update user with id ${userId}.`,
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const newPassword = req.body.password;
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          hashedPassword: hashedPassword,
          phoneNumber: req.body.phoneNumber,
          role: req.body.role,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete User",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User with email ${email} not found`,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Wrong password.",
      });
    }

    const token = generateToken(user.userId, user.role);
    return res.status(200).json({
      success: true,
      message: `User with email ${email} logged in successfully.`,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to login.",
      error: error.message,
    });
  }
};

module.exports = {
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
};
