import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/', notesRoutes);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

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