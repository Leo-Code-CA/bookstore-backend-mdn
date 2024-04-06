import { Router } from 'express';
import AllUsersController from './../../controllers/users/allUsersController.mjs';

const router = Router();

// GET request - login endpoint
router.get('/login', AllUsersController.users_login_get);

// POST request - login endpoint
router.post('/login', AllUsersController.users_login_post);

// POST request - logout endpoint
router.post('/logout', AllUsersController.users_log_out_post);

// GET request - sign up endpoint
router.get('/signup', AllUsersController.users_sign_up_get);

// POST request - sign up endpoint
router.post('/signup', AllUsersController.users_sign_up_post);

export default router;
