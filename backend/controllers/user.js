const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "The email already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password is at least 6 characters long." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ message: "Register Success!", user: newUser, token });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "An error occurred during registration." });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const cookieOptions = {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res
      .status(200)
      .cookie("token", token, cookieOptions)
      .json({ message: "Login Success!", user: user, token });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

const logout = async (req, res) => {
  try {
    const cookieOptions = {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    };

    res
      .status(200)
      .cookie("token", "", cookieOptions)
      .json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while logging out." });
  }
};

const forgetPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { register, login, logout, forgetPassword, resetPassword };
