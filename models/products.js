const mongoose = require('mongoose');

const { Schema } = mongoose;

const productsSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
    minLength: 4,
  },
  price: {
    type: Number,
  },
  netto: {
    type: Number,
    required: true,
  },
  vat: {
    type: Number,
    default: 23,
    min: 0,
    max: 100,
    required: true,
  },
  brutto: {
    type: Number,
    required: true,
  },
  dateOfPurchase: Date,
  dateOfLastInspection: Date,
  quantity: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  selectedFile: String,
});

const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
