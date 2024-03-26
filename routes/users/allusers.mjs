import { Router } from 'express';

const router = Router();

// GET request - login endpoint
router.get('/auth', (req, res, next) => {
	res.send('GET request login endpoint - NOT SET UP YET');
});

// POST request - login endpoint
router.post('/auth', (req, res, next) => {
	res.send('POST request login enpoint - NOT SET UP YET');
});

export default router;
