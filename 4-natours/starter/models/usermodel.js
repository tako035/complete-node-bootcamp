const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'email is a must as a login name'],
    unique: true,
  },
  role: String,
  active: Boolean,
  photo: String,
  password: { String, required: [true, 'Password field must not be empty'] },
});
const User = new mongoose.model('User', userSchema);

module.exports = User;
