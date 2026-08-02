import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  const { from, to, subject, html, text } = options;

  const mailOptions = {
    from: from || process.env.SMTP_FROM,
    to,
    subject,
    html,
    text,
  };

  return await transporter.sendMail(mailOptions);
};