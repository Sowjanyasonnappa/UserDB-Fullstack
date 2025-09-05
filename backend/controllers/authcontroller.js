// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");

// const { OAuth2Client } = require("google-auth-library");


// const client = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID");


// exports.googleLogin = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.YOUR_GOOGLE_CLIENT_ID,
//     });

//     const payload = ticket.getPayload();
//     const email = payload.email;

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = new User({ email });
//       await user.save();
//     }

//     const myToken = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
//     res.json({ token: myToken });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: "Invalid Google token" });
//   }
// };


// exports.register = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const hashed = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashed });
//     await user.save();
//     res.json({ message: "User registered" });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });


//     const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

  


// controllers/authcontroller.js
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload.email;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
      await user.save();
    }

    const myToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token: myToken });
  } catch (err) {
    console.error("Google login error:", err);
    res.status(400).json({ error: "Invalid Google token" });
  }
};

