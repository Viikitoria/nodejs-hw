import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import handlebars from 'handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const { to, subject, templatePath, data } = options;

  const templateContent = await fs.readFile(templatePath, 'utf-8');
  const compiledTemplate = handlebars.compile(templateContent);
  const html = compiledTemplate(data);

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  };

  return await transporter.sendMail(mailOptions);
};