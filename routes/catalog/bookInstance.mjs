import { Router } from 'express';
import BookInstanceController from '../../controllers/catalog/bookInstanceController.mjs';

const router = Router();

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/bookinstance/create', BookInstanceController.bookinstance_create_get);

// POST request for creating BookInstance.
router.post('/bookinstance/create', BookInstanceController.bookinstance_create_post);

// GET request to delete BookInstance.
router.get('/bookinstance/:id/delete', BookInstanceController.bookinstance_delete_get);

// POST request to delete BookInstance.
router.post('/bookinstance/:id/delete', BookInstanceController.bookinstance_delete_post);

// GET request to update BookInstance.
router.get('/bookinstance/:id/update', BookInstanceController.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', BookInstanceController.bookinstance_update_post);

// GET request for one BookInstance.
router.get('/bookinstance/:id', BookInstanceController.bookinstance_detail);

// GET request for list of all BookInstance.
router.get('/bookinstances', BookInstanceController.bookinstance_list);

export default router;
