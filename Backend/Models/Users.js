const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
// @gmial.com

  },
  password: {
    type: String,
    required: true,
  },

  role:{
    type: String,
    required: true,
    // default: 'patient',
  }
  
}, {collection:'userData'});

module.exports = mongoose.model('UserData', userSchema);


