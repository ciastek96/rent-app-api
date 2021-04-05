const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
