const mongoose = require('mongoose')

const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true
  },

  programDetails: {
    type: String,
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
},
 {
  timestamps: true
})

module.exports = mongoose.model('Program', programSchema);