const { SERVER_ERR } = require('../const');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500
    ? `${SERVER_ERR}: ${err.message}`
    : err.message;

  res.status(statusCode).send({ message });

  next();
};

module.exports = {
  errorHandler,
};
