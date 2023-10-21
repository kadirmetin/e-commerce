const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authenticationMid = async (req, res, next) => {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({ message: "You are not authenticated" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) {
      return res.status(401).json({ message: "Invalid access token." });
    }

    req.user = await User.findById(decodedData.id);

    if (!req.user) {
      return res.status(401).json({ message: "User not found." });
    }

    next();
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ message: "An error occurred while authenticating." });
  }
};

const adminAuthenticationMid = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to access this route." });
    }

    next();
  };
};

module.exports = { authenticationMid, adminAuthenticationMid };
