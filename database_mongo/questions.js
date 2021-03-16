import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = {
  product_id: Number,
  question_body: String,
  question_helpful: Number,
  question_date: {type: Date, default: Date.now},
  asker_name: String,
  reported: Boolean
}

const Question = mongoose.model('question', questionSchema);

module.exports = {
  Question
}