require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const pdf = require('html-pdf');

const pdfTemplate = require('./documents');

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const clientsRouter = require('./routes/clients');
const rentsRouter = require('./routes/rents');
const accountsRouter = require('./routes/accounts');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const uri = process.env.NODE_DATABASE;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Connection error.', err);
});

db.once('open', () => {
  console.log('Connected to database.');
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/rents', rentsRouter);
app.use('/accounts', accountsRouter);

app.get('/', (req, res) => {
  res.send('Hello from API!');
});

app.post('/create-pdf', (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

app.get('/fetch-pdf', (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port: ${port}`);
});

// app.listen(port, '127.0.0.1', () => {
//   console.log(`Server is running on port: ${port}`);
// });
