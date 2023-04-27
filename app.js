const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
// const { router, publicRouter } = require('./routes');
const routes = require('./routes');

const { limiter } = require('./utils/limiter');
// const auth = require('./middlewares/auth');
const { NotFoundError } = require('./errors/not-found-error');
const { errorHandler } = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_ADDRESS } = require('./config');
const { SERVER_WILL_CRASH_MESSAGE, PAGE_NOT_FOUND_MESSAGE, LISTENING_ON_PORT } = require('./const');

const app = express();
app.use(helmet());
app.use(cors());

// подключаемся к серверу mongo
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);

// Краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(SERVER_WILL_CRASH_MESSAGE);
  }, 0);
});

// app.use('/', publicRouter); // Роуты, которым не нужна авторизация
// app.use(auth);
app.use('/', routes); // Роуты, которым нужна авторизация

app.use((req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_MESSAGE));
});

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`${LISTENING_ON_PORT} ${PORT}`);
});
