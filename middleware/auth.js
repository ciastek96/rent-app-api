const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.userID = decodedData.userID;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = auth;
