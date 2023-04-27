const router = require('express').Router();

const routerUsers = require('./users');
const routerMovies = require('./movies');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');

// Роуты, которым не нужна авторизация
router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

// Роуты, которым нужна авторизация
router.use(auth);
router.use('/users', routerUsers);
router.use('/movies', routerMovies);

module.exports = router; // экспортировали роутеры
