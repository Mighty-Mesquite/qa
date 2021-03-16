import mongoose from 'mongoose';
const { Schema } = mongoose;

const answerSchema = new Schema({
  product_id: Number,
  question_id: Number,
  answerer_name: String,
  helpfullness: Number,
  photos: [photoSchema],
  body: String,
  date: { type: Date, default: Date.now}
});

const Answer = mongoose.model('answer', answerSchema);

module.export = {
  Answer
}