import { Router } from 'express';
import MembersController from '../../controllers/users/membersController.mjs';

const router = Router();

// GET request - access user portal
router.get('/portal/member/:userId', MembersController.member_portal_get);

export default router;
