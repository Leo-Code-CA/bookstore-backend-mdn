import { Router } from 'express';
import AuthorController from '../../controllers/catalog/authorController.mjs';

const router = Router();

/// AUTHOR ROUTES ///

// GET request for list of all Authors.
router.get('/authors', AuthorController.author_list);

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', AuthorController.author_create_get);

// POST request for creating Author.
router.post('/author/create', AuthorController.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', AuthorController.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', AuthorController.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', AuthorController.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', AuthorController.author_update_post);

// GET request for one Author.
router.get('/author/:id', AuthorController.author_detail);

export default router;
