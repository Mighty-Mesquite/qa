import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = {
  question_id: Number,
  question_body: String,
  question_date: { type: Date, default: Date.now },
  asker_name: String,
  asker_email: String,
  reported: Boolean,
  question_helpful: Number
}

const Question = mongoose.model('question', questionSchema);

module.exports = {
  Question
}