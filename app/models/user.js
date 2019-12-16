const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    unique: true
  },

  hashedPassword: {
    type: String,
    required: true
  },

  userRole: {
    type: String, 
    enum: ['admin', 'Volunteer'],
    default: ['Volunteer'],
    required: true
    },

  token: String, 

  userProgram: [{
    type: Schema.Types.ObjectId,
    ref: 'Program'
  }]
}, 

{
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

/* userSchema.virtual('examples', {
  ref: 'Example',
  localField: '_id',
  foreignField: 'owner'
}); */

module.exports = mongoose.model('User', userSchema);


