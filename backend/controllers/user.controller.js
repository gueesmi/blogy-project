const User = require("../models/User.model");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const userInfo = req.body;
  try {
    const hashed = await hashPassword(userInfo.password);
    userInfo.password = hashed;
    const user = new User(userInfo);
    const data = await user.save();
    res.status(200).json({
      message: " User created",
      data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  let passwordValidation;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json("Email or password invalid!");
    } else {
      passwordValidation = await comparePassword(password, user.password);
    }
    if (!passwordValidation) {
      res.status(400).json("Email or password invalid!");
    } else {
      const { _id, name } = user;
      const token = jwt.sign({ _id, name }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .cookie("authToken", token, {
          maxAge: 60000 * 60,
          httpOnly: true,
          secure: true,
        })
        .json({ message: "successfuly login" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const me = async (req, res) => {
  if (req.cookies.authToken) {
    try {
      const decoded = jwt.verify(req.cookies.authToken, process.env.SECRET_KEY);
      res.status(200).json({
        name: decoded.name,
        isLoggedIn: true,
      });
    } catch (error) {
      console.log(error.message);
      res.status(403).json({
        message: "not authorized",
        name: "",
        isLoggedIn: false,
      });
    }
  } else if (!req.cookies.authToken) {
    res.status(403).json({
      message: "not authorized",
      name: "",
      isLoggedIn: false,
    });
  }
};
const logout = (req, res) => {
  const authToken = req.cookies.authToken;
  if (authToken) {
    res.clearCookie("authToken").json({ message: "Logged out" });
  } else {
    res.json({ message: "no token" });
  }
};

const profile = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { register, login, me, logout, profile };
