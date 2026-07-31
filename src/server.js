import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import notesRoutes from './routes/notesRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
}));

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на порту ${PORT}`);
  console.log(`📝 http://localhost:${PORT}`);
});