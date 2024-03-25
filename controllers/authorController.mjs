import { Author } from './../mongoose/schemas/author.mjs';
import { Book } from './../mongoose/schemas/book.mjs';
import expressAsyncHandler from 'express-async-handler';
import { body, validationResult, matchedData } from 'express-validator';

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
const author_create_get = (req, res, next) => {
	return res.render('author_form', { title: 'Create Author'});
}

// Handle Author create on POST.
const author_create_post = [
	// validate and sanitize
	body('first_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage('First name must be specified.')
		.isAlphanumeric()
		.withMessage("First name shouldn't contain non-alphanumeric characters."), 
	body('family_name')
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Family name must be specified")
		.isAlphanumeric()
		.withMessage("Family name shouldn't contain non-alphanumeric characters"),
	body('date_of_birth', 'Invalid date of birth')
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	body('date_of_death', 'Invalid date of death')
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	
	// process the request
	expressAsyncHandler(async (req, res, next) => {

		const errors = validationResult(req.body);

		if (!errors.isEmpty()) {
			return res.render('author_form', {
				title: 'Create Author',
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death,
				errors: errors.array()
			})
		}

		const validatedReqData = matchedData(req)

		const author = new Author({
			first_name: validatedReqData.first_name,
			family_name: validatedReqData.family_name,
			date_of_birth: validatedReqData.date_of_birth,
			date_of_death: validatedReqData.date_of_death
		});

		await author.save();

		res.redirect(author.url);
	
	})
];

// Display Author delete form on GET.
const author_delete_get = expressAsyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec()
	]);

	if (author === null) res.redirect('/catalog/authors');

	res.render("author_delete", {
		title: "Delete Author",
		author: author,
		author_books: allBooksByAuthor
	});
});

// Handle Author delete on POST.
const author_delete_post = expressAsyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec()
	])

	if (allBooksByAuthor.length > 0) {
		return res.render("author_delete", {
			title: "Delete Author",
			author: author,
			author_books: allBooksByAuthor
		})
	} else {
		await Author.findByIdAndDelete(req.body.authorid);
		res.redirect('/catalog/authors');
	}
});

// Display Author update form on GET.
const author_update_get = expressAsyncHandler(async (req, res, next) => {
	const author = await Author.findById(req.params.id).exec();

	if (author === null) {
		const err = new Error('Author not found.');
		err.status = 404;
		next(err);
	} else {
		res.render("author_form", {
			title: 'Update Author',
			author: author
		})
	}
});

// Handle Author update on POST.
const author_update_post = [
	// validation and sanitization
	body("first_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Must be provided")
		.isAlphanumeric()
		.withMessage("Must only contain alphanumeric characters"),
	body("family_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Must be provided")
		.isAlphanumeric()
		.withMessage("Must only contain alphanumeric characters"),
	body("date_of_birth", "Invalid date of birth")
		.optional({ values: 'falsy' })
		.isISO8601()
		.toDate(),
	body("date_of_death", "Invalid date of death")
		.optional({ values: 'falsy' })
		.isISO8601()
		.toDate(),

	expressAsyncHandler(async (req, res, next) => {
	
		const errors = validationResult(req);
		const validatedData = matchedData(req);
		const author = new Author({
			first_name: validatedData.first_name,
			family_name: validatedData.family_name,
			date_of_birth: validatedData.date_of_birth,
			date_of_death: validatedData.date_of_death,
			_id: req.params.id
		});

		if (!errors.isEmpty()) {
			res.render("author_form", {
				author: author,
				errors: errors.array()
			})
		} else {
			const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, author, {});
			res.redirect(updatedAuthor.url);
		}
	})
];

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
