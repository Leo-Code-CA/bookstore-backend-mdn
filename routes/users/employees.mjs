import { Router } from 'express';

const router = Router();

// GET request - access employee portal
router.get('/portal/admin/:userId', (req, res, next) => {
	res.send('GET request employees portal - NOT SET UP YET.');
});

export default router;
