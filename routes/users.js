const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required(),
  }),
}), updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router; // экспортировали роутер
