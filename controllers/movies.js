const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/not-found-error');
const { ValidationError } = require('../errors/validation-error');
const { ForbiddenError } = require('../errors/forbidden-error');

const SUCCESS = 200;
const SUCCESS_CREATED = 201;

// Поиск всех сохраненных текущим пользователем фильмов
const findMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner'])
    .then((movie) => res.status(SUCCESS).send({ data: movie }))
    .catch(next);
};

// Создание нового фильма с переданными в теле полями
const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => movie.populate(['owner']).then((data) => res.status(SUCCESS_CREATED).send({ data })))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Ошибка создания фильма, переданы некорректные данные: ${err}`));
        return;
      }
      next(err);
    });
};

// Удаление сохраненного фильма по идентификатору
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError('Фильм не найден'));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError('Удаление чужого фильма не допускается'));
      }
      return movie.deleteOne()
        .then((data) => res.status(SUCCESS).send({ data }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(`Переданы некорректные данные: ${err}`));
      }
      return next(err);
    });
};

module.exports = {
  findMovies,
  createMovie,
  deleteMovie,
};
