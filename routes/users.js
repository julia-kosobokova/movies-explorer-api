const router = require('express').Router();
const { updateUserValidation } = require('../middlewares/validation');

const {
  updateUser,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser); // возвращает информацию о текущем пользователе
router.patch('/me', updateUserValidation, updateUser); // обновляет информацию о пользователе (email и имя)

module.exports = router; // экспортировали роутер
