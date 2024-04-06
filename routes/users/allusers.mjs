import { Router } from 'express';
import AllUsersController from './../../controllers/users/allUsersController.mjs';
// import passport from 'passport';

const router = Router();

// GET request - login endpoint
router.get('/login', AllUsersController.users_login_get);

// POST request - login endpoint
router.post('/login', AllUsersController.users_login_post);

// GET request - sign up endpoint
router.get('/signup', AllUsersController.users_sign_up_get);

// POST request - sign up endpoint
router.post('/signup', AllUsersController.users_sign_up_post);

export default router;

// WORKS
// router.post('/login', function (req, res, next) {
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
// });
