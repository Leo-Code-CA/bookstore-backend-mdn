import expressAsyncHandler from 'express-async-handler';
import { Book } from './../mongoose/schemas/book.mjs';

const index = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Site Home Page');
});

// Display list of all books.
const book_list = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book list');
});

// Display detail page for a specific book.
const book_detail = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display book create form on GET.
const book_create_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book create GET');
});

// Handle book create on POST.
const book_create_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book create POST');
});

// Display book delete form on GET.
const book_delete_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book delete GET');
});

// Handle book delete on POST.
const book_delete_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book delete POST');
});

// Display book update form on GET.
const book_update_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book update GET');
});

// Handle book update on POST.
const book_update_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: Book update POST');
});

const book_controller = {
	index,
	book_list,
	book_detail,
	book_create_get,
	book_create_post,
	book_delete_get,
	book_delete_post,
	book_update_get,
	book_update_post,
};

export default book_controller;
