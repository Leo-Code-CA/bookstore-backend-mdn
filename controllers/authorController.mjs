import { Author } from './../mongoose/schemas/author.mjs';
import { Book } from './../mongoose/schemas/book.mjs';
import expressAsyncHandler from 'express-async-handler';

// Display list of all authors
const author_list = expressAsyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find().sort({ family_name: 1 }).exec();

	res.render('author_list', {
		title: 'Author List',
		author_list: allAuthors,
	});
});

// Display detail page for a specific Author.
const author_detail = expressAsyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, 'title summary').exec()
	]);

	if (author === null) {
		const err = new Error('Author not found!');
		err.status = 404;
		next(err);
	}

	res.render('author_detail', {
		title: 'Author Detail',
		author: author,
		author_books: allBooksByAuthor
	})
});

// Display Author create form on GET.
const author_create_get = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author create GET`);
});

// Handle Author create on POST.
const author_create_post = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author create POST`);
});

// Display Author delete form on GET.
const author_delete_get = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author delete GET`);
});

// Handle Author delete on POST.
const author_delete_post = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author delete POST`);
});

// Display Author update form on GET.
const author_update_get = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author update GET`);
});

// Handle Author update on POST.
const author_update_post = expressAsyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Author update POST`);
});

const author_controller = {
	author_list,
	author_detail,
	author_create_get,
	author_create_post,
	author_delete_get,
	author_delete_post,
	author_update_get,
	author_update_post,
};

export default author_controller;
