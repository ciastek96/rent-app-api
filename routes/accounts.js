const router = require('express').Router();
const mongoose = require('mongoose');
const Account = require('../models/accounts');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { userID } = req;
  const account = await Account.findOne({ userID });
  try {
    res.status(200).send(account);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.post('/add', auth, (req, res) => {
  const { userId } = req;
  const newAccount = new Account({ userId });

  newAccount
    .save()
    .then(() => res.json('Account added!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

router.patch('/', auth, async (req, res) => {
  const { userID, body: values } = req;

  try {
    const updatedAccount = await Account.findOneAndUpdate({ userID }, values, { new: true });
    res.status(201).json(updatedAccount);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

router.delete('/', auth, (req, res) => {
  const { userID } = req;

  Account.findOneAndDelete({ userID })
    .then(() => res.json('Account deleted!'))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
