const { celebrate, Joi } = require('celebrate');
const { URL_VALIDATION_RX } = require('../const');

// Валидация создания пользователя
const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидация входа пользователя
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// Валидация обновления профиля пользователя
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

// Валидация создания фильма
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URL_VALIDATION_RX),
    trailerLink: Joi.string().required().regex(URL_VALIDATION_RX),
    thumbnail: Joi.string().required().regex(URL_VALIDATION_RX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

// Валидация удаления фильма
const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserValidation,
  createMovieValidation,
  deleteMovieValidation,
};
