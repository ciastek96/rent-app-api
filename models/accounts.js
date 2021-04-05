const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    trim: true,
  },
  surname: {
    type: String,
    trim: true,
  },
  companyName: {
    type: String,
  },
  nip: {
    type: String,
  },
  phone: { type: String, trim: true },
  email: {
    type: String,
    trim: true,
  },
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
  },
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
