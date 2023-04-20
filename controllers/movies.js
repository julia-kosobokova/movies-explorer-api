const Movie = require('../models/movie');

const { NotFoundError } = require('../errors/not-found-error');
const { ValidationError } = require('../errors/validation-error');
const { ForbiddenError } = require('../errors/forbidden-error');
const { ConflictError } = require('../errors/conflict-error');
const {
  MOVIE_EXISTS_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  CANNOT_DELETE_MOVIE_MESSAGE,
  MOVIE_CREATE_ERR_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  SUCCESS,
  SUCCESS_CREATED,
} = require('../const');

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

  Movie.findOne({ movieId, owner })
    .then((foundMovie) => {
      if (foundMovie !== null) {
        next(new ConflictError(MOVIE_EXISTS_MESSAGE));
        return;
      }
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
            next(new ValidationError(`${MOVIE_CREATE_ERR_MESSAGE}: ${err}`));
            return;
          }
          next(err);
        });
    });
};

// Удаление сохраненного фильма по идентификатору
const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .populate(['owner'])
    .then((movie) => {
      if (movie === null) {
        return next(new NotFoundError(MOVIE_NOT_FOUND_MESSAGE));
      }
      if (movie.owner._id.toString() !== req.user._id) {
        return next(new ForbiddenError(CANNOT_DELETE_MOVIE_MESSAGE));
      }
      return movie.deleteOne()
        .then((data) => res.status(SUCCESS).send({ data }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(`${INCORRECT_DATA_MESSAGE}: ${err}`));
      }
      return next(err);
    });
};

module.exports = {
  findMovies,
  createMovie,
  deleteMovie,
};
