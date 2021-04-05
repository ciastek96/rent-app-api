const mongoose = require('mongoose');

const { Schema } = mongoose;

const rentsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  client: {
    type: Object,
    required: true,
  },
  dateOfRent: {
    type: Date,
    required: true,
  },
  dateOfReturn: {
    type: Date,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  advance: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    trim: true,
  },
  products: [
    {
      productName: {
        type: String,
        trim: true,
        minLength: 4,
      },
      price: {
        type: Number,
      },
      netto: {
        type: Number,
      },
      vat: {
        type: Number,
        default: 23,
        min: 0,
        max: 100,
      },
      brutto: {
        type: Number,
      },
      dateOfPurchase: Date,
      dateOfLastInspection: Date,
      quantity: {
        type: Number,
      },
      qty: {
        type: Number,
        default: 1,
      },
      unit: {
        type: String,
      },
      selectedFile: String,
    },
  ],
  brutto: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  netto: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  rentDuration: {
    type: Number,
    required: true,
  },
});

const Rent = mongoose.model('Rent', rentsSchema);

module.exports = Rent;
