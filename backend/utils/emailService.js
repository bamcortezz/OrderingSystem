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

      const frontendUrl = process.env.FRONTEND_URL;
      const resetUrl = `${frontendUrl}/reset-password/${resetToken}/${userId}`;

      await transporter.sendMail({
         from: process.env.SMTP_USER,
         to: email,
         subject: "Reset Your Password",
         html: `
        <div style="background-color: #000; padding: 40px 20px; font-family: Arial, sans-serif; text-align: center; color: #fff;">
          <div style="max-width: 500px; margin: auto; background: #111; border: 1px solid #222; border-radius: 10px; padding: 30px;">
            <h2 style="color: #fff; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="color: #bbb; font-size: 14px; margin-bottom: 30px;">
              You requested to reset your password. Click the button below to set a new password.
            </p>
            <a href="${resetUrl}"
              style="display: inline-block; padding: 12px 24px; font-size: 14px; font-weight: bold; color: #000; background: #fff; border-radius: 8px; text-decoration: none;">
              Reset Password
            </a>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              If you didn’t request this, you can ignore this email.
            </p>
          </div>
        </div>
      `
      });

      return true;

   } catch (error) {
      throw error;
   }
};

module.exports = { sendPasswordReset };
