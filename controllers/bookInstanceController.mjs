import { BookInstance } from './../mongoose/schemas/bookInstance.mjs';
import { Book } from './../mongoose/schemas/book.mjs';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult, matchedData } from 'express-validator';

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
	const bookInstance = await BookInstance.findById(req.params.id).populate('book').exec();

	if (bookInstance === null) {
		const err = new Error('Book copy not found!');
		err.status = 404;
		return next(err);
	}

	res.render('bookinstance_detail', {
		title: 'Book:',
		book_instance: bookInstance,
	});
});

// Display BookInstance create form on GET.
const bookinstance_create_get = expressAsyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();

	console.log(allBooks);

	res.render('bookinstance_form', {
		title: 'Create a book copy',
		book_list: allBooks,
	});
});

// Handle BookInstance create on POST.
const bookinstance_create_post = [
	// valide and sanitize
	body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
	body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
	body('due_back', 'Invalid date').optional({ values: 'falsy' }).isISO8601().toDate(),
	body('status').escape(),

	// process the request
	expressAsyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const validatedData = matchedData(req);

		// console.log(validatedData);

		const bookInstance = new BookInstance({
			book: validatedData.book,
			imprint: validatedData.imprint,
			due_back: validatedData.due_back,
			status: validatedData.status,
		});

		if (!errors.isEmpty) {
			const [allBooks] = await Book.find({}, 'title').sort({ title: 1 }).exec();

			return res.render('bookinstance_form', {
				title: 'Create a book copy',
				book_list: allBooks,
				selected_book: bookInstance.book._id,
				book_instance: bookInstance,
				errors: errors.array(),
			});
		}

		await bookInstance.save();

		res.redirect(bookInstance.url);
	}),
];

// Display BookInstance delete form on GET.
const bookinstance_delete_get = expressAsyncHandler(async (req, res, next) => {
	const bookInstance = await BookInstance.findById(req.params.id).exec();

	if (bookInstance === null) return res.redirect('/catalog/bookinstances');

	res.render('bookinstance_delete', {
		title: 'Delete a Book Copy',
		book_instance: bookInstance,
	});
});

// Handle BookInstance delete on POST.
const bookinstance_delete_post = expressAsyncHandler(async (req, res, next) => {
	// const bookInstance = await BookInstance.findById(req.params.id).exec();
	await BookInstance.findByIdAndDelete(req.body.bookinstanceid);
	res.redirect('/catalog/bookinstances');
});

// Display BookInstance update form on GET.
const bookinstance_update_get = expressAsyncHandler(async (req, res, next) => {
	const [bookInstance, allBooks] = await Promise.all([
		BookInstance.findById(req.params.id).populate('book').exec(),
		Book.find().sort({ title: 1 }).exec(),
	]);

	if (bookInstance === null) {
		const err = new Error('Book Copy Not Found.');
		err.status = 404;
		next(err);
	} else {
		res.render('bookinstance_form', {
			title: 'Update a Book Copy',
			book_instance: bookInstance,
			book_list: allBooks,
			selected_book: bookInstance.book._id,
		});
	}
});

// Handle bookinstance update on POST.
const bookinstance_update_post = [
	// validate and sanitize
	body('book').trim().isLength({ min: 1 }).escape(),
	body('imprint').trim().isLength({ min: 1 }).escape(),
	body('status').escape(),
	body('due_back').optional({ values: 'falsy' }).isISO8601().toDate(),

	// process the request
	expressAsyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const validatedData = matchedData(req);

		const bookInstance = new BookInstance({
			book: validatedData.book,
			imprint: validatedData.imprint,
			status: validatedData.status,
			due_back: validatedData.due_back,
			_id: req.params.id,
		});

		if (!errors.isEmpty()) {
			const allBooks = await Book.find().sort({ title: 1 }).exec();

			return res.render({
				title: 'Update a Book Copy',
				book_instance: bookInstance,
				book_list: allBooks,
				errors: errors.array(),
			});
		} else {
			const updatedBookInstance = await BookInstance.findByIdAndUpdate(
				req.params.id,
				bookInstance,
				{}
			);

			res.redirect(updatedBookInstance.url);
		}
	}),
];

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
