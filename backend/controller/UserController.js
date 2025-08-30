const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sendPasswordReset } = require('../utils/emailService');

const register = async (req, res) => {
   const { first_name, last_name, email, password, confirm_password } = req.body;
   try {

      if (!first_name || !last_name || !email || !password || !confirm_password) {
         return res.status(400).json({ message: "All fields are required." });
      }

      const user = await User.findOne({ email });
      if (user) {
         return res.status(400).json({ message: "User already exists." });
      }

      if (password !== confirm_password) {
         return res.status(400).json({ message: "Password does not match." });
      }

      const newUser = await User.create({
         first_name,
         last_name,
         email,
         password
      });

      res.status(201).json({
         message: "User registered successfully.",
         data: {
            id: newUser._id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email
         }
      })

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
         token,
         data: {
            id: user._id,
            email: user.email,
            first_name: user.first_name
         }
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

      const reset_token = crypto.randomBytes(32).toString('hex');
      const reset_token_expire = Date.now() + 15 * 60 * 1000;

      user.reset_token = reset_token;
      user.reset_token_expire = reset_token_expire;
      await user.save();

      await sendPasswordReset(email, reset_token, user._id);

      res.status(200).json({ message: "Successfully sent OTP to the email" });

   } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
   }
}

const resetPassword = async (req, res) => {

   const { password, confirm_password } = req.body;
   const { reset_token, user_id } = req.params;

   try {

      if (!reset_token && !user_id) {
         return res.status(400).json({ message: "Invalid or missing token and id" });
      }

      if (!password || !confirm_password) {
         return res.status(400).json({ message: "All fields are required." });
      }

      if (password !== confirm_password) {
         return res.status(400).json({ message: "Password does not match." });
      }

      const user = await User.findOne({
         _id: user_id,
         reset_token: reset_token,
         reset_token_expire: { $gt: Date.now() }
      });

      if (!user) {
         return res.status(400).json({ message: "Invalid or expired reset token." });
      }

      const hash_password = await bcrypt.hash(password, 10);

      user.password = hash_password;
      user.reset_token = undefined;
      user.reset_token_expire = undefined;
      await user.save();

      res.status(200).json({ message: "Password reset successfully." })

   } catch (error) {
      res.status(500).json({ message: `Server Error: ${error.message}` });
   }
}


module.exports = {
   register,
   login,
   forgotPassword,
   resetPassword
}