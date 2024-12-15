const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    required: true
  },
  contactNo: {
    type: String,
    default: '',
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid contact number!`,
    },
  },
  specialization: {
    type: String,
    default: '', // Optional for doctors
  },
  experience: {
    type: Number,
    default: 0, // Optional for doctors
  },
  consultationFee: {
    type: Number,
    default: 0, // Optional for doctors
  },
  availability: {
    type: [String],
    default: [], // Optional for doctors
  },
  address: {
    type: String,
    default: '',
  },
  age: {
    type: Number,
    min: 0,
    default: 0, // Optional for patients
  },
  gender: {
    type: String,
    default: '',
    enum: ['Male', 'Female', 'Other'],
  },
  bloodGroup: {
    type: String,
    default: '',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
}, { collection: 'userDetails'});

module.exports = mongoose.model('UserData', userSchema);
