import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use('/', authRoutes);
app.use('/', notesRoutes);
app.use('/', userRoutes);

// ✅ ПРАВИЛЬНИЙ ПОРЯДОК:
app.use(notFoundHandler);  // 1. Спочатку 404
app.use(errors());         // 2. Потім помилки celebrate
app.use(errorHandler);     // 3. Потім загальні помилки

const startServer = async () => {
  try {
    await connectMongoDB();
    app.listen(PORT, () => {
      console.log(`✅ Сервер запущено на порту ${PORT}`);
      console.log(`📝 http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Помилка запуску сервера:', error.message);
    process.exit(1);
  }
};

startServer();