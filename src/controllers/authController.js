import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendEmail } from '../utils/sendMail.js';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const requestResetEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'Password reset email sent successfully' });
    }

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const resetLink = `${process.env.FRONTEND_DOMAIN}/reset-password?token=${token}`;

    const templatePath = path.join(__dirname, '../templates/reset-password-email.html');

    await sendEmail(
      email,
      'Відновлення пароля',
      templatePath,
      {
        username: user.username || user.email,
        resetLink,
      }
    );

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    if (error.message === 'Failed to send the email, please try again later.') {
      next(createHttpError(500, 'Failed to send the email, please try again later.'));
    } else {
      next(error);
    }
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw createHttpError(401, 'Invalid or expired token');
    }

    const user = await User.findOne({ _id: decoded.sub, email: decoded.email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    next(error);
  }
};