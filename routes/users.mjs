import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
	res.send("You've got that, keep going!");
});

router.get('/:name', (req, res) => {
	res.status(200).send(`Hey! I am ${req.params.name}`);
});

export default router;
