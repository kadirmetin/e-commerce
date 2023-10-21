const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const nodemailer = require("nodemailer");

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
        .json({ message: "Password must be at least 6 characters long." });
    }

    const avatar = await cloudinary.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        public_id: avatar.public_id,
        url: avatar.secure_url,
      },
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
      .json({ message: "Registration Successful!", user: newUser, token });
  } catch (error) {
    console.error("Registration error:", error);

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

const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    const passwordResetToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(passwordResetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/reset/${passwordResetToken}`;

    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password</p>
      <a href="${resetURL}" clicktracking="off">${resetURL}</a>
    `;

    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        service: process.env.SMTP_SERVICE,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent" });
    } catch (error) {
      console.error(error);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      res.status(500).json({ message: "Email could not be sent." });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token." });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

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
      .json({ message: "Reset Password Successful!", user, token });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ message: "An error occurred while resetting the password." });
  }
};

const userDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  userDetail,
};
