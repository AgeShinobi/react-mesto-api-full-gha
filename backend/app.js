/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
// Import Packages
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const { DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const { PORT } = require('./config');

// Import Middlewares
const error = require('./middlewares/errors');
const { cors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

// Celebrate Joi Validator Middleware
const { errors } = require('celebrate');

// Import Router
const mainRouter = require('./routes/index');

mongoose.connect(DATABASE_URL);

// App
const app = express();

app.use(requestLogger);

app.use(express.json());
app.use(cors);
app.use(mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening: PORT ${PORT}`);
});
