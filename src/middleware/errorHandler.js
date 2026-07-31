export const errorHandler = (err, req, res, next) => {
  console.error('Помилка:', err.message);
  console.error('Стек:', err.stack);

  const status = err.status || 500;
  const message = err.message || 'Внутрішня помилка сервера';

  res.status(status).json({
    status,
    message,
  });
};