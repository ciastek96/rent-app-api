const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/users');
const Account = require('../models/accounts');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) res.status(409).send({ message: 'Already used.' });
      else {
        bcrypt.hash(password, 10, (error, hash) => {
          const newUser = new User({ username, email, password: hash });

          newUser
            .save()
            .then(() => {
              User.findOne({ username })
                .then((response) => {
                  const newAccount = new Account({ userID: response._id, email, username });

                  newAccount
                    .save()
                    .then(() => {
                      res.status(201).send('Created.');
                    })
                    .catch((err) => res.status(500).send({ message: err.message }));
                })
                .catch((err) => res.status(409).send({ message: err.message }));
            })
            .catch((err) => res.status(500).send({ message: err.message }));
        });
      }
    })
    .catch((error) => res.status(400).send({ message: error.message }));
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  try {
    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userID: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '12h' });
      res.status(200).json({ token });
    } else {
      res.status(401).send({ message: 'Nieprawidłowe hasło. ' });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

router.patch('/updatePassword', auth, async (req, res) => {
  const {
    userID: _id,
    body: { currentPassword, newPassword },
  } = req;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No users with that ID');

  const user = await User.findById({ _id });

  try {
    if (bcrypt.compareSync(currentPassword, user.password)) {
      bcrypt.hash(newPassword, 10, async (error, hash) => {
        await User.findByIdAndUpdate({ _id }, { password: hash }, { new: true });
        res.status(201).json('Hasło zaaktualizowane. ');
      });
    } else {
      res.status(401).json('Nieprawidłowe hasło. ');
    }
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
