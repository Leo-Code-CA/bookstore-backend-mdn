import { Router } from 'express';
import GenreController from './../../controllers/genreController.mjs';

const router = Router();

/// GENRE ROUTES ///

// GET request for list of all Genre.
router.get('/genres', GenreController.genre_list);

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', GenreController.genre_create_get);

//POST request for creating Genre.
router.post('/genre/create', GenreController.genre_create_post);

// GET request to delete Genre.
router.get('/genre/:id/delete', GenreController.genre_delete_get);

// POST request to delete Genre.
router.post('/genre/:id/delete', GenreController.genre_delete_post);

// GET request to update Genre.
router.get('/genre/:id/update', GenreController.genre_update_get);

// POST request to update Genre.
router.post('/genre/:id/update', GenreController.genre_update_post);

// GET request for one Genre.
router.get('/genre/:id', GenreController.genre_detail);

export default router;
