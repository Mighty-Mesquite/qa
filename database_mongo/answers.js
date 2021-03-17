import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new Schema({
  question_id: Number,
  body: String,
  answer_date: { type: Date, default: Date.now}
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpful: Number,
  photos: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Photo'
  }]
});

const Answer = mongoose.model('answer', answerSchema);

module.exports = {
  Answer
}