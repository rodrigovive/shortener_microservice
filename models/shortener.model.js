const mongoose = require('mongoose');
const autoincrementShort = require('./plugins/shortUpdatedOn')
const shortenerSchema = new mongoose.Schema({

  url: {
    type: String,
    required: true
  },

  short: {
    type: Number,
    default: 0
  }

});

shortenerSchema.plugin(autoincrementShort);

const Shortener = mongoose.model('Shortener',shortenerSchema);

module.exports = Shortener;