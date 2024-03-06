import expressAsyncHandler from 'express-async-handler';
import { Genre } from './../mongoose/schemas/genre.mjs';

// Display list of all Genre.
const genre_list = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre list');
});

// Display detail page for a specific Genre.
const genre_detail = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
const genre_create_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create GET');
});

// Handle Genre create on POST.
const genre_create_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre create POST');
});

// Display Genre delete form on GET.
const genre_delete_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete GET');
});

// Handle Genre delete on POST.
const genre_delete_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre delete POST');
});

// Display Genre update form on GET.
const genre_update_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update GET');
});

// Handle Genre update on POST.
const genre_update_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Genre update POST');
});

const genre_controller = {
	genre_list,
	genre_detail,
	genre_create_get,
	genre_create_post,
	genre_delete_get,
	genre_delete_post,
	genre_update_get,
	genre_update_post,
};

export default genre_controller;
