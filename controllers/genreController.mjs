import expressAsyncHandler from 'express-async-handler';
import { Genre } from './../mongoose/schemas/genre.mjs';
import { Book } from './../mongoose/schemas/book.mjs';

// Display list of all Genre.
const genre_list = expressAsyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find().sort({ name: 1 }).exec();

	res.render('genre_list', {
		title: 'Genre List',
		genre_list: allGenres,
	});
});

// Display detail page for a specific Genre.
const genre_detail = expressAsyncHandler(async (req, res, next) => {
	const [genre, booksInGenre] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id }, 'title summary').exec(),
	]);

	if (genre === null) {
		const err = new Error('Genre not found');
		err.status = 404;
		return next(err);
	}

	res.render('genre_detail', {
		title: 'Genre Detail',
		genre,
		genre_books: booksInGenre,
	});
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
