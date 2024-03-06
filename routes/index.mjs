import { Router } from 'express';
import homeRouter from './home.mjs';
import usersRouter from './users.mjs';
import catalogRouter from './catalog/index.mjs';

const router = Router();

router.use('/', homeRouter);
router.use('/users', usersRouter);
router.use('/catalog', catalogRouter);

export default router;
