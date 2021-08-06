const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

var Schema = mongoose.Schema;

const Images = new Schema({
  title: { type: String },
  cost: { type: Number, required: true },
  description: {type: String, required: true},
  thumbnail: { type: String, required: true },
  largeImg: {type: String, required: true}
});

  Images.plugin(mongoosePaginate);

  module.exports = mongoose.model('Images', Images);