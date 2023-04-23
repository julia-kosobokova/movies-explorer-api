const router = require('express').Router();
const publicRouter = require('express').Router();

const { router: routerUsers, publicRouter: publicRouterUsers } = require('./users');
const routerMovies = require('./movies');

router.use('/users', routerUsers);
router.use('/movies', routerMovies);
publicRouter.use('/', publicRouterUsers);

module.exports = {
  router,
  publicRouter,
}; // экспортировали роутеры
