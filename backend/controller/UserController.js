const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const register = async (req, res) => {
   const { first_name, last_name, email, password, confirm_password } = req.body;
   try {

      if (!first_name || !last_name || !email || !password || !confirm_password) {
         return res.status(400).json({ message: "All fields are required." });
      }

      const userExist = await User.findOne({ email });
      if (userExist) {
         return res.status(400).json({ message: "User already exists." });
      }

      if (password !== confirm_password) {
         return res.status(400).json({ message: "Password does not match." });
      }

      await User.create({
         first_name,
         last_name,
         email,
         password
      });

      res.status(201).json({ message: "User registered successfully." })

   } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
   }
}

const login = async (req, res) => {
   const { email, password } = req.body;

   try {

      if (!email || !password) {
         return res.status(400).json({ message: "All fields are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "No account found." })
      }

      const verifyPassword = await bcrypt.compare(password, user.password);
      if (!verifyPassword) {
         return res.status(400).json({ message: "Incorrect password. Please try again." });
      }

      const payload = {
         id: user._id,
         email: user.email
      }

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(200).json({
         message: "Login successfully",
         token
      })

   } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
   }
}

const forgotPassword = async (req, res) => {
   const { email } = req.body;

   try {

      if (!email) {
         return res.status(400).json({ message: "All fields are required." });
      }

      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "No account found" });
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpire = Date.now() + 15 * 60 * 1000;

      user.reset_token = resetToken;
      user.reset_token_expire = resetTokenExpire;
      await user.save();


   } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
   }
}

const resetPassword = async (req, res) => {
   try {

   } catch (error) {

   }
}


module.exports = {
   register,
   login,
   forgotPassword,
   resetPassword
}