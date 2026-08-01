export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Внутрішня помилка сервера';

  console.error(`❌ Помилка (${status}):`, message);
  console.error('Стек:', err.stack);

  res.status(status).json({
    status,
    message,
  });
};