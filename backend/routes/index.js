// Packages
const mainRouter = require('express').Router();

// Routes
const signup = require('./signup');
const signin = require('./signin');
const users = require('./users');
const cards = require('./cards');
const notFound = require('./notFound');

// Middlewares
const auth = require('../middlewares/auth');

// Crash test
mainRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Methods
mainRouter.use('/signup', signup);
mainRouter.use('/signin', signin);
mainRouter.use('/users', auth, users);
mainRouter.use('/cards', auth, cards);
mainRouter.use('*', notFound);

module.exports = mainRouter;
