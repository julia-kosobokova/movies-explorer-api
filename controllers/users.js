const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { NotFoundError } = require('../errors/not-found-error');
const { ValidationError } = require('../errors/validation-error');
const { ConflictError } = require('../errors/conflict-error');
const { UnauthorizedError } = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../const');

const SUCCESS = 200;
const SUCCESS_CREATED = 201;

// Создание нового пользователя
const createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(SUCCESS_CREATED).send({
      data: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Ошибка создания пользователя, переданы некорректные данные: ${err}`));
        return;
      }
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
        return;
      }
      next(err);
    });
};

// Обновление профиля
const updateUser = (req, res, next) => {
  const { name, email } = req.body;
  // обновим имя и описание найденного по _id пользователя
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((user) => {
      if (user === null) {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      res.status(SUCCESS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Ошибка обновления пользователя, переданы некорректные данные: ${err}`));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User
    .findOne({ email }).select('+password')
    .orFail(() => { throw new UnauthorizedError('Неправильные имя пользователя или пароль'); })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      next(new UnauthorizedError('Неправильные имя пользователя или пароль'));
      return user;
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res.send({
        user,
        token,
      });
    })
    .catch(next);
};

// Получение информации о текущем пользователе
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = {
  updateUser,
  getCurrentUser,
  createUser,
  login,
};
