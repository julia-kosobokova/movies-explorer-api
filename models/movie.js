const mongoose = require('mongoose');
const { URL_VALIDATION_RX, INVALID_URL_MESSAGE } = require('../const');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const rx = URL_VALIDATION_RX;
        return rx.test(v);
      },
      message: (props) => `${props.value} ${INVALID_URL_MESSAGE}`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const rx = URL_VALIDATION_RX;
        return rx.test(v);
      },
      message: (props) => `${props.value} ${INVALID_URL_MESSAGE}`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const rx = URL_VALIDATION_RX;
        return rx.test(v);
      },
      message: (props) => `${props.value} ${INVALID_URL_MESSAGE}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
