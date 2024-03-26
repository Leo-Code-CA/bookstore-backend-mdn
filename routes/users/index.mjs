import { Router } from 'express';
import employeesRouter from './employees.mjs';
import customersRouter from './customers.mjs';
import allUsersRouter from './allusers.mjs';

const router = Router();

router.use(allUsersRouter);
router.use(employeesRouter);
router.use(customersRouter);

export default router;
