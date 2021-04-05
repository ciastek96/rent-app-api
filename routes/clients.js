const router = require('express').Router();
const mongoose = require('mongoose');
const Client = require('../models/clients');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const { userID } = req;

  try {
    const clients = await Client.find({ userID });
    res.status(200).json(clients);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.post('/add', auth, async (req, res) => {
  const { userID, body: values } = req;
  const newClient = new Client({ userID, ...values });

  try {
    newClient.save();

    res.status(201).json(newClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.patch('/:id', auth, async (req, res) => {
  // const { id: _id } = req.params;
  const {
    userID,
    params: { id: _id },
    body: values,
  } = req;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No clients with that ID');

  try {
    const updatedClient = await Client.findByIdAndUpdate({ _id }, { userID, ...values }, { new: true });
    res.status(201).json(updatedClient);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No clients with that ID');

  await Client.findByIdAndRemove({ _id });
  res.json({ message: 'Client deleted successfully' });
});

module.exports = router;
