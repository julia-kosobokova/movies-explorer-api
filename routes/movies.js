const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

const {
  findMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', findMovies); // возвращает все сохраненные текущим пользователем фильмы

router.post('/', createMovieValidation, createMovie); // создает фильм

router.delete('/:_id', deleteMovieValidation, deleteMovie); // удаляет сохраненный фильм по id

module.exports = router; // экспортировали роутер
