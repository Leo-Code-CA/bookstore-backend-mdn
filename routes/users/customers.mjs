import { Router } from 'express';

const router = Router();

// GET request - access user portal
router.get('/portal/reader/:userId', (req, res, next) => {
	res.send('GET request users portal - NOT SET UP YET');
});

export default router;
