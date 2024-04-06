import expressAsyncHandler from 'express-async-handler';
import passport from 'passport';
import './../../strategies/local-strategy.mjs';
import { body, matchedData, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { User } from '../../mongoose/schemas/user.mjs';

// Display login form form on GET.
const users_login_get = (req, res, next) => {
	// if the user is not authenticated - prompt to login
	if (!req.user) {
		res.render('login', {
			title: 'Login Page',
		});
	} else {
		// if the user is authenticated - redirect to their profile
		const {
			user: { user_type, _id },
		} = req;
		if (user_type === 'member') {
			return res.redirect(`/users/portal/member/${_id}`);
		} else if (user_type === 'employee') {
			return res.redirect(`/users/portal/admin/${_id}`);
		} else {
			throw new Error('User type not reconized');
		}
	}
};

// Handle user login on POST.
const users_login_post = [
	// if the user is authenticated - redirect to their profile
	(req, res, next) => {
		if (req.user) {
			const {
				user: { user_type, _id },
			} = req;
			if (user_type === 'member') {
				return res.redirect(`/users/portal/member/${_id}`);
			} else if (user_type === 'employee') {
				return res.redirect(`/users/portal/admin/${_id}`);
			} else {
				throw new Error('User type not reconized');
			}
		}
		next();
	},
	// if the user is not authenticated - authenticate with passport
	passport.authenticate('local'),
	// the user is now authenticated and can be redirected to their profile
	(req, res) => {
		const {
			user: { user_type, _id },
		} = req;
		if (user_type === 'member') {
			return res.redirect(`/users/portal/member/${_id}`);
		} else if (user_type === 'employee') {
			return res.redirect(`/users/portal/admin/${_id}`);
		} else {
			throw new Error('User type not reconized');
		}
	},
];

// Handle user logout
const users_log_out_post = (req, res, next) => {
	// if the user is not found throw a 404
	if (!req.user) return res.status(404).send('User not found');
	// clear the session cookie
	res.clearCookie('connect.sid');
	// logout of passport
	req.logout(error => {
		if (error) throw new Error("couldn't log out of passport");
		// destroy session
		req.session.destroy(error => {
			if (error) throw new Error("session couldn't be destroyed");
			res.send('logged out!');
		});
	});
};

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

	// create the new user and save it into the db
	async (req, res, next) => {
		const result = validationResult(req);
		if (!result.isEmpty()) return res.status(400).send(result.array());

		try {
			const data = matchedData(req);
			// check if the user already exists in the db
			const findUser = await User.findOne({ username: data.username });
			if (findUser) return res.status(409).send('user already exists!');
			// hash the password
			data.password = await bcrypt.hash(data.password, 10);
			// create the new user and save it into the db
			const newUser = new User(data);
			await newUser.save();
			next();
		} catch (error) {
			console.log(error);
			return res.sendStatus(400);
		}
	},

	passport.authenticate('local'),

	(req, res) => {
		const {
			user: { user_type, _id },
		} = req;
		if (user_type === 'member') {
			return res.redirect(`/users/portal/member/${_id}`);
		} else if (user_type === 'employee') {
			return res.redirect(`/users/portal/admin/${_id}`);
		} else {
			throw new Error('User type not reconized');
		}
	},
];

const all_users_controller = {
	users_login_get,
	users_login_post,
	users_sign_up_get,
	users_sign_up_post,
	users_log_out_post,
};

export default all_users_controller;
