const URL_VALIDATION_RX = /https?:\/\/(www\.)?[\w\-.]+\.\w{2,}([\w\-._~:/?#[\]@!$&'()*+,;=]+)?/;

// Сообщения ответов и ошибок
const SERVER_ERR = 'На сервере произошла ошибка';
const SERVER_WILL_CRASH_MESSAGE = 'Сервер сейчас упадёт';
const LISTENING_ON_PORT = 'App listening on port';
const PAGE_NOT_FOUND_MESSAGE = 'Страница по указанному маршруту не найдена';
const MOVIE_EXISTS_MESSAGE = 'Этот фильм уже есть в вашем списке';
const MOVIE_CREATE_ERR_MESSAGE = 'Ошибка создания фильма, переданы некорректные данные';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден';
const CANNOT_DELETE_MOVIE_MESSAGE = 'Удаление чужого фильма не допускается';
const INCORRECT_DATA_MESSAGE = 'Переданы некорректные данные';
const USER_CREATE_ERR_MESSAGE = 'Ошибка создания пользователя, переданы некорректные данные';
const USER_EXISTS_MESSAGE = 'Пользователь с таким email уже существует';
const USER_NOT_FOUND_MESSAGE = 'Пользователь не найден';
const USER_UPDATE_ERR_MESSAGE = 'Ошибка обновления пользователя, переданы некорректные данные';
const INCORRECT_EMAIL_OR_PASSWORD_MESSAGE = 'Неправильные имя пользователя или пароль';
const AUTHORIZATION_MESSAGE = 'Необходима авторизация';
const INCORRECT_EMAIL_MESSAGE = 'Неправильный формат почты';
const INVALID_URL_MESSAGE = 'Недопустимый URL!';

module.exports = {
  URL_VALIDATION_RX,
  SERVER_ERR,
  SERVER_WILL_CRASH_MESSAGE,
  LISTENING_ON_PORT,
  PAGE_NOT_FOUND_MESSAGE,
  MOVIE_EXISTS_MESSAGE,
  MOVIE_CREATE_ERR_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  CANNOT_DELETE_MOVIE_MESSAGE,
  INCORRECT_DATA_MESSAGE,
  USER_CREATE_ERR_MESSAGE,
  USER_EXISTS_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_UPDATE_ERR_MESSAGE,
  INCORRECT_EMAIL_OR_PASSWORD_MESSAGE,
  AUTHORIZATION_MESSAGE,
  INCORRECT_EMAIL_MESSAGE,
  INVALID_URL_MESSAGE,
};
