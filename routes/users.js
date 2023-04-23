const router = require('express').Router();
const publicRouter = require('express').Router();
const { updateUserValidation, loginValidation, createUserValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
  createUser,
  login,
} = require('../controllers/users');

router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе
router.patch('/me', updateUserValidation, updateUser); // обновляет информацию о пользователе (email и имя)

// Роуты, которым не нужна авторизация
publicRouter.post('/signin', loginValidation, login);
publicRouter.post('/signup', createUserValidation, createUser);

module.exports = {
  router,
  publicRouter,
}; // экспортировали роутеры
