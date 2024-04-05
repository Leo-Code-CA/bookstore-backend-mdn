import { Router } from 'express';
import EmployeesController from './../../controllers/users/employeesController.mjs';

const router = Router();

// GET request - access employee portal
router.get('/portal/admin/:userId', EmployeesController.employees_portal_get);

export default router;
