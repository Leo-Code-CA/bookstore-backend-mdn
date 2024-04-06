import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
import './../../strategies/local-strategy.mjs';
import { body, matchedData, validationResult } from 'express-validator';
import { hashPassword } from '../../utils/password_crypt.mjs';
import { User } from '../../mongoose/schemas/user.mjs';

// Display login form form on GET.
const users_login_get = (req, res, next) => {
	res.render('login', {
		title: 'Login Page',
	});
};

// Handle user login on POST.
const users_login_post = [
	//auth with passport js
	// passport.authenticate('local', {
	// 	successMessage: 'You are successfully logged in!',
	// 	failureMessage: 'Authentication failed',
	// }),
	passport.authenticate('local'),
	//handle request
	expressAsyncHandler(async (req, res, next) => {
		res.status(200).send('Logged in!');
	}),
];
// const users_login_post = (req, res, next) => {
// 	passport.authenticate('local', function (err, user, info, status) {
// 		if (err) {
// 			console.log(err, user, info, status);
// 			return next(err);
// 		}
// 		if (!user) {
// 			console.log(err, user, info, status);
// 			return res.send('no user');
// 		}
// 		res.send('works!');
// 	})(req, res, next);
// };

// const users_login_post = [
// 	passport.authenticate('local', function (err, user, info, status) {
// 		if (err) {
// 			console.log(err, user, info, status);
// 			return next(err);
// 		}
// 		if (!user) {
// 			console.log(err, user, info, status);
// 			return res.send('no user');
// 		}
// 	}),

// 	(req, res) => {

// 	}
// ];

// Display sign up form on GET
const users_sign_up_get = (req, res, next) => {
	res.render('sign_up', {
		title: 'Sign Up Page',
	});
};

// Handle user profile creation on POST
const users_sign_up_post = [
	// validation and sanitization
	body('username', 'Username must contain between 5 and 20 characters.')
		.trim()
		.isLength({
			min: 5,
			max: 20,
		})
		.isString()
		.escape(),
	body('password', 'Password must contain at least 8 characters').notEmpty().isString().escape(),
	body('user_type').escape(),

	async (req, res, next) => {
		const result = validationResult(req);
		console.log(result);
		console.log(req.body);
		if (!result.isEmpty()) return res.status(400).send(result.array());

		const data = matchedData(req);

		data.password = await hashPassword(data.password);

		const newUser = new User(data);

		console.log(newUser);

		try {
			const savedUser = await newUser.save();
			return res.status(201).send(savedUser);
		} catch (error) {
			console.log(error);
			return res.sendStatus(400);
		}
	},
];

const all_users_controller = {
	users_login_get,
	users_login_post,
	users_sign_up_get,
	users_sign_up_post,
};

export default all_users_controller;
