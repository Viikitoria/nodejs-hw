import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Назва нотатки обов\'язкова'],
      minlength: [3, 'Назва має містити щонайменше 3 символи'],
      maxlength: [100, 'Назва не може перевищувати 100 символів'],
    },
    content: {
      type: String,
      required: [true, 'Вміст нотатки обов\'язковий'],
      minlength: [5, 'Вміст має містити щонайменше 5 символів'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Note = model('Note', noteSchema);

export default Note;