import { Router } from 'express';
import AllUsersController from './../../controllers/users/allUsersController.mjs';

const router = Router();

// GET request - login endpoint
router.get('/login', AllUsersController.users_login_get);

// POST request - login endpoint
router.post('/login', AllUsersController.users_login_post);

export default router;
