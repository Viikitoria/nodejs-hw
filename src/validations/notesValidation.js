import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Кастомна валідація ObjectId
const isValidObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

// GET /notes - валідація query параметрів
export const getAllNotesSchema = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
});

// GET /notes/:noteId та DELETE /notes/:noteId - валідація params
export const noteIdSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(isValidObjectId, 'ObjectId validation').required(),
  }),
});

// POST /notes - валідація body
export const createNoteSchema = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').default(''),
    tag: Joi.string().valid(...TAGS),
  }),
});

// PATCH /notes/:noteId - валідація params + body
export const updateNoteSchema = celebrate({
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(isValidObjectId, 'ObjectId validation').required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  })
    .min(1)
    .message('Body cannot be empty'),
});