import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: '',
    },
    tag: {
      type: String,
      trim: true,
      enum: [
        'Todo',
        'Important',
        'Meeting',
        'Ideas',
        'Personal',
        'Health',
        'Study',
        'Home',
        'Finance',
        'Other',
      ],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model('Note', noteSchema);

export default Note;