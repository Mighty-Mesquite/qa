import mongoose from 'mongoose';
const { Schema } = mongoose;

const photoSchema = new Schema({
  answer_id: Number,
  url: String
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = {
  Photo
}