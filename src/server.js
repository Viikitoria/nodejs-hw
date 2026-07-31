require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pino = require('pino-http');
const notesRoutes = require('./routes/notesRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const { notFoundHandler } = require('./middleware/notFoundHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(pino());  // ← Ось так просто!

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Сервер запущено на порту ${PORT}`);
  console.log(`📝 http://localhost:${PORT}`);
});