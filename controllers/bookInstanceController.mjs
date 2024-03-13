import { BookInstance } from './../mongoose/schemas/bookInstance.mjs';
import expressAsyncHandler from 'express-async-handler';

// Display list of all BookInstances.
const bookinstance_list = expressAsyncHandler(async (req, res, next) => {
	const allBookInstances = await BookInstance.find().populate('book').exec();

	res.render('bookinstance_list', {
		title: 'Book Instances List',
		bookinstance_list: allBookInstances,
	});
});

// Display detail page for a specific BookInstance.
const bookinstance_detail = expressAsyncHandler(async (req, res, next) => {
	const bookInstance = await BookInstance
							.findById(req.params.id)
							.populate('book')
							.exec();

	if (bookInstance === null) {
		const err = new Error('Book copy not found!');
		err.status = 404;
		return next(err);
	}

	res.render('bookinstance_detail', {
		title: "Book:",
		book_instance: bookInstance
	})
});

// Display BookInstance create form on GET.
const bookinstance_create_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance create GET');
});

// Handle BookInstance create on POST.
const bookinstance_create_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance create POST');
});

// Display BookInstance delete form on GET.
const bookinstance_delete_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance delete GET');
});

// Handle BookInstance delete on POST.
const bookinstance_delete_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance delete POST');
});

// Display BookInstance update form on GET.
const bookinstance_update_get = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance update GET');
});

// Handle bookinstance update on POST.
const bookinstance_update_post = expressAsyncHandler(async (req, res, next) => {
	res.send('NOT IMPLEMENTED: BookInstance update POST');
});

const bookinstance_controller = {
	bookinstance_list,
	bookinstance_detail,
	bookinstance_create_get,
	bookinstance_create_post,
	bookinstance_delete_get,
	bookinstance_delete_post,
	bookinstance_update_get,
	bookinstance_update_post,
};

export default bookinstance_controller;
