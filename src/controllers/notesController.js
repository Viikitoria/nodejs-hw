import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    let query = Note.find();

    if (tag) {
      query = query.where('tag').equals(tag);
    }

    if (search) {
      query = query.or([
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ]);
    }

    const [totalNotes, notes] = await Promise.all([
      Note.countDocuments(query._conditions),
      query.skip((page - 1) * perPage).limit(perPage).exec(),
    ]);

    const totalPages = Math.ceil(totalNotes / perPage);

    res.json({
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

    if (!note) {
      throw createHttpError(404, `Нотатку з ID ${noteId} не знайдено`);
    }

    res.json(note);
  } catch (error) {
    next(error);
  }
};

export const createNote = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    const newNote = await Note.create({ title, content, tag });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title, content, tag } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { title, content, tag },
      { returnDocument: 'after', runValidators: true }
    );

    if (!updatedNote) {
      throw createHttpError(404, `Нотатку з ID ${noteId} не знайдено`);
    }

    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      throw createHttpError(404, `Нотатку з ID ${noteId} не знайдено`);
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};