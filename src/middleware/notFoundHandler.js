export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `Маршрут ${req.method} ${req.url} не знайдено`,
  });
};