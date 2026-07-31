const notes = require('../data/notes');

const getNotes = (req, res) => {
  res.json(notes);
};

const getNoteById = (req, res, next) => {
  const { noteId } = req.params;
  const note = notes.find((n) => n.id === noteId);

  if (!note) {
    const error = new Error(`Нотатку з ID ${noteId} не знайдено`);
    error.status = 404;
    return next(error);
  }

  res.json(note);
};

const getTestError = (req, res, next) => {
  try {
    throw new Error('Це тестова помилка для перевірки обробника 500');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotes,
  getNoteById,
  getTestError,
};