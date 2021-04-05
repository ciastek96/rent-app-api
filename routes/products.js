const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/products');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { userID } = req;

  try {
    const products = await Product.find({ userID });
    res.status(200).json(products);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/product', auth, async (req, res) => {
  const { id } = req.body;

  try {
    const product = await Product.findById({ _id: id });
    res.status(200).json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', auth, async (req, res) => {
  const { userID, body: values } = req;
  const { brutto, vat } = values;
  const netto = (brutto / (1 + vat / 100)).toFixed(2);

  const newProduct = new Product({ ...values, userID, netto });

  try {
    newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  const { id: _id } = req.params;
  const { userID, body: values } = req;
  const { brutto, vat } = values;

  const netto = (brutto * (1 - vat / 100)).toFixed(2);

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  try {
    const updatedProduct = await Product.findByIdAndUpdate({ _id }, { ...values, userID, netto }, { new: true });
    res.status(201).json(updatedProduct);
  } catch (err) {
    res.status(409).json({ message: err.message });
    console.log(err);
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No products with that ID');

  try {
    await Product.findByIdAndRemove({ _id });
    res.json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
    console.log(err);
  }
});

module.exports = router;
