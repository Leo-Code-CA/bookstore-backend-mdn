import { Router } from 'express';
import authorRouter from './author.mjs';
import bookRouter from './book.mjs';
import bookInstanceRouter from './bookInstance.mjs';
import genreRouter from './genre.mjs';

const router = Router();

router.use(authorRouter);
router.use(bookRouter);
router.use(bookInstanceRouter);
router.use(genreRouter);

export default router;
