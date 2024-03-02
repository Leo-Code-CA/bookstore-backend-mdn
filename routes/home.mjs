import { Router } from 'express';

const router = Router();

router.get('/', function (req, res, next) {
	res.render('index', { title: 'The BackEnd World' });
});

export default router;
