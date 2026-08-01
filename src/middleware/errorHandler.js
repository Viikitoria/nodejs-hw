import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'Внутрішня помилка сервера';

  if (createHttpError.isHttpError(err)) {
    status = err.statusCode || err.status || 500;
    message = err.message || 'Помилка HTTP';
  } else if (err.message) {
    message = err.message;
  }

  console.error(`❌ Помилка (${status}):`, message);
  console.error('Стек:', err.stack);

  res.status(status).json({ message });
};