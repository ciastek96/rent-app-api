const router = require('express').Router();
const mongoose = require('mongoose');
const Rent = require('../models/rents');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { userID } = req;
  try {
    const rents = await Rent.find({ userID });
    res.status(200).json(rents);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', auth, async (req, res) => {
  const values = req.body;
  const { userID } = req;

  const newRent = new Rent({ ...values, userID });

  try {
    newRent.save();
    res.status(201).json(newRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  const { id: _id } = req.params;
  const { userID } = req;
  const values = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  try {
    const updatedRent = await Rent.findByIdAndUpdate({ _id }, { ...values, userID }, { new: true });
    res.status(201).json(updatedRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/finish/:id', auth, async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  try {
    const finishedRent = await Rent.findByIdAndUpdate({ _id }, { isFinished: true }, { new: true });
    res.status(201).json(finishedRent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No rent with that ID');

  await Rent.findByIdAndRemove({ _id });
  res.json({ message: 'Rent deleted successfully' });
});

module.exports = router;
