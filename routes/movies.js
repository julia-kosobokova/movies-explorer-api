const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_VALIDATION_RX } = require('../const');

const {
  findMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', findMovies); // возвращает все сохраненные текущим пользователем фильмы

router.post('/', celebrate({
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
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie); // создает фильм

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
}), deleteMovie); // удаляет сохраненный фильм по id

module.exports = router; // экспортировали роутер
