const nodemailer = require('nodemailer');

const sendPasswordReset = async (email, resetToken, userId) => {
   try {

      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
         }
      });

      const resetUrl = `https://localhost:5173/reset-password/${resetToken}/${userId}`;

      await transporter.sendMail({
         from: process.env.SMTP_USER,
         to: email,
         subject: "Password Reset Request",
         html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6;">
               <h2>Password Reset Request</h2>
               <p>Hello,</p>
               <p>We received a request to reset your password. Click the link below to reset it:</p>
               <a href="${resetUrl}" 
                  style="display: inline-block; padding: 10px 20px; margin-top: 10px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                  Reset Password
               </a>
               <p>If you did not request this, you can safely ignore this email.</p>
            </div>
         `
      });

      return true

   } catch (error) {
      throw error;
   }
}


module.exports = { sendPasswordReset }