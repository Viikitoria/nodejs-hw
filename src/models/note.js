import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: 'Untitled',
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      trim: true,
      default: 'Todo',
      enum: ['Todo', 'In Progress', 'Done'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model('Note', noteSchema);

export default Note;