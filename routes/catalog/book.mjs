import { Router } from 'express';
import BookController from '../../controllers/catalog/bookController.mjs';

const router = Router();

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', BookController.index);

// GET request for list of all Book items.
router.get('/books', BookController.book_list);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', BookController.book_create_get);

// POST request for creating Book.
router.post('/book/create', BookController.book_create_post);

// GET request to delete Book.
router.get('/book/:id/delete', BookController.book_delete_get);

// POST request to delete Book.
router.post('/book/:id/delete', BookController.book_delete_post);

// GET request to update Book.
router.get('/book/:id/update', BookController.book_update_get);

// POST request to update Book.
router.post('/book/:id/update', BookController.book_update_post);

// GET request for one Book.
router.get('/book/:id', BookController.book_detail);

export default router;
