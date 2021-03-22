import mongoose from 'mongoose';
const { Schema } = mongoose;
const { Answer } = './answer.js';

const questionSchema = {
  question_id: Number,
  question_body: String,
  question_date: { type: Date, default: Date.now },
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  question_helpful: Number,
  answers: [Answer]
}

const Question = mongoose.model('question', questionSchema);

module.exports = {
  Question
}