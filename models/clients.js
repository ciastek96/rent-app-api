const mongoose = require('mongoose');

const { Schema } = mongoose;

const clientSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  companyName: {
    type: String,
  },
  nip: {
    type: String,
  },
  phone: { type: String, required: true, trim: true },
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
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  selectedFile: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
