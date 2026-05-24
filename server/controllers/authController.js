const User = require("../models/User");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate Token
    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;

    // 10 minutes expiry
    user.resetTokenExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.MAIL_SMTP_HOST,
      port: process.env.MAIL_SMTP_PORT,
       secure: false,  
         tls: {
       rejectUnauthorized: false,
         },

     family: 4, 
      auth: {
        user: process.env.MAIL_SMTP_USER,
        pass: process.env.MAIL_SMTP_PASSWORD,
      },
    });

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",

      html: `
        <h2>Password Reset</h2>

        <p>Click below link to reset password</p>

        <a href="${resetLink}">
          Reset Password
        </a>
      `,
    });

    res.status(200).json({
      message: "Reset link sent to email",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or Expired Token",
      });
    }

    res.status(200).json({
      message: "Token Valid",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const bcrypt = require("bcryptjs");

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;

    const { password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token Expired",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;

    // Clear token
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.status(200).json({
      message: "Password Reset Successful",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
