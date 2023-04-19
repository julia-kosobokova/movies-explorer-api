const URL_VALIDATION_RX = /https?:\/\/(www\.)?[\w\-.]+\.\w{2,}([\w\-._~:/?#[\]@!$&'()*+,;=]+)?/;
const JWT_SECRET = (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET) ? process.env.JWT_SECRET : 'super-strong-secret';

module.exports = {
  URL_VALIDATION_RX,
  JWT_SECRET,
};
