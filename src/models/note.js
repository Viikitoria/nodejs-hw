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
      enum: [
        'Work',
        'Personal',
        'Study',
        'Health',
        'Finance',
        'Travel',
        'Shopping',
        'Home',
        'Idea',
        'Other',
      ],
      default: 'Other',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model('Note', noteSchema);

export default Note;