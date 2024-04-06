import express from 'express';
import createHttpError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/index.mjs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import './strategies/local-strategy.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mongoDB = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookstoredb';

// connect to mongoDB
mongoose
	.set('strictQuery', false)
	.connect(mongoDB)
	.then(() => {
		console.log('Connected to the database');
	})
	.catch(err => {
		console.log(err);
	});

// create Express app
const app = express();

// compress all the routes
app.use(compression());

// protect against well known vulnerabilities
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
		},
	})
);

// add rate limits to API routes
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000,
	max: 50,
});

app.use(limiter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// express session
app.use(
	session({
		secret: 'locallibrarysecret',
		saveUninitialized: false,
		resave: false,
		store: MongoStore.create({
			client: mongoose.connection.getClient(),
		}),
	})
);

// passport js
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(router);
app.use(passport.authenticate('session'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createHttpError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

export default app;

// NEXT STEPS:
// check docs: https://www.passportjs.org/tutorials/password/
// check docs: https://www.npmjs.com/package/connect-mongo
// create authentication system with mongo store and passport
