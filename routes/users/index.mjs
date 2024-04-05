import { Router } from 'express';
import employeesRouter from './employees.mjs';
import membersRouter from './members.mjs';
import allUsersRouter from './allusers.mjs';

const router = Router();

router.use(allUsersRouter);
router.use(employeesRouter);
router.use(membersRouter);

export default router;
