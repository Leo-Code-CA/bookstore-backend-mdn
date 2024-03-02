import express from 'express';
import createHttpError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import router from './routes/index.mjs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

mongoose
	.set('strictQuery', false)
	.connect('mongodb://127.0.0.1:27017/bookstoredb')
	.then(() => {
		console.log('Connected to the database');
	})
	.catch(err => {
		console.log(err);
	});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

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

// STOPPED AT Express Tutorial Part 3: Using a Database (with Mongoose)
// Connection to mandodb with mangoose
// # Connecting to MongoDB
