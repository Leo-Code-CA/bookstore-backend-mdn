import expressAsyncHandler from 'express-async-handler';
import { body, validationResult, matchedData } from 'express-validator';
import { Book } from './../mongoose/schemas/book.mjs';
import { Author } from './../mongoose/schemas/author.mjs';
import { BookInstance } from './../mongoose/schemas/bookInstance.mjs';
import { Genre } from './../mongoose/schemas/genre.mjs';

const index = expressAsyncHandler(async (req, res, next) => {
	// Get details of books, book instances, authors and genre counts (in parallel)
	const [numBooks, numBookInstances, numAvailableBookInstances, numAuthors, numGenres] =
		await Promise.all([
			Book.countDocuments({}).exec(),
			BookInstance.countDocuments({}).exec(),
			BookInstance.countDocuments({ status: 'Available' }),
			Author.countDocuments({}).exec(),
			Genre.countDocuments({}).exec(),
		]);

	res.render('index', {
		title: 'Local Library Home',
		book_count: numBooks,
		book_instance_count: numBookInstances,
		book_instance_available_count: numAvailableBookInstances,
		author_count: numAuthors,
		genre_count: numGenres,
	});
});

// Display list of all books.
const book_list = expressAsyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, 'title author')
		.sort({ title: 1 })
		.populate('author')
		.exec();

	res.render('book_list', {
		title: 'Book List',
		book_list: allBooks,
	});
});

// Display detail page for a specific book.
const book_detail = expressAsyncHandler(async (req, res, next) => {
	// console.log(req.params.id)
	const [book, bookInstances] = await Promise.all([
		Book
		.findById(req.params.id)
		.populate('author')
		.populate('genre')
		.exec(),
		BookInstance
		.find({ book: req.params.id })
		.exec()
	])

	if (!book) {
		const err = new Error("Book not found!");
		err.status = 404;
		return next(err);
	}

	res.render('book_detail', {
		title: book.title,
		book: book,
		book_instances: bookInstances
	})
});


// Display book create form on GET.
const book_create_get = expressAsyncHandler(async (req, res, next) => {
	const [allAuthors, allGenres] = await Promise.all([
		Author.find().sort({ family_name: 1}).exec(),
		Genre.find().sort({ name: 1 }).exec()
	]);

	res.render('book_form',  {
		title: "Create Book",
		authors: allAuthors,
		genres: allGenres
	})
});

// Handle book create on POST.
const book_create_post = [

	// convert genre to an array 
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
		}
		next();
	},

	// validate and sanitize
	body("title")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("author", "Author must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("genre.*").escape(),

	// process the request
	expressAsyncHandler(async (req, res, next) => {

		// console.log(req.body)

		const errors = validationResult(req);

		const validatedResult = matchedData(req);

		const book = new Book({
			title: validatedResult.title,
			author: validatedResult.author,
			summary: validatedResult.summary,
			isbn: validatedResult.isbn,
			genre: validatedResult.genre
		})

		if (!errors.isEmpty()) {

			const [allAuthors, allGenres] = await Promise.all([
				Author.find().sort({ family_name: 1}).exec(),
				Genre.find().sort({ name: 1 }).exec()
			]);

			for (const genre of allGenres) {
				// console.log(book.genre)
				// console.log(genre)
				if (book.genre.includes(genre._id)) {
					genre.checked = true
				}
			}

			return res.render({
				title: "Create Book",
				author: allAuthors,
				genre: allGenres,
				book: book,
				errors: errors.array()
			})
		}

		await book.save();

		res.redirect(book.url);
	
	})
]

// Display book delete form on GET.
const book_delete_get = expressAsyncHandler(async (req, res, next) => {
	const [book, allBookInstances] = await Promise.all([
		Book.findById(req.params.id).exec(),
		BookInstance.find({ book: req.params.id }, "imprint status").exec()
	])

	if (book === null) return res.redirect('/catalog/books');

	res.render("book_delete", {
		title: 'Delete Book',
		book: book,
		book_instances: allBookInstances
	})
});

// Handle book delete on POST.
const book_delete_post = expressAsyncHandler(async (req, res, next) => {
	const [book, allBookInstances] = await Promise.all([
		Book.findById(req.params.id).exec(),
		BookInstance.find({ book: req.params.id }, "imprint status").exec()
	]);

	if (allBookInstances.length > 0) {
		return res.render("book_delete", {
			title: "Delete Book",
			book: book,
			book_instances: allBookInstances
		})
	} else {
		await Book.findByIdAndDelete(req.body.bookid);
		res.redirect('/catalog/books');
	}
});

// Display book update form on GET.
const book_update_get = expressAsyncHandler(async (req, res, next) => {
	const [book, allAuthors, allGenres] = await Promise.all([
		Book.findById(req.params.id).populate("author").exec(),
		Author.find().sort({ family_name: 1 }).exec(),
		Genre.find().sort({ name: 1 }).exec()
	]);

	console.log(book, allAuthors, allGenres)

	if (book === null) {
		const error = new Error('Book not found.');
		error.status = 404;
		next(error);
	}

	allGenres.forEach(genre => book.genre.includes(genre._id) ? genre.checked = true : null);

	res.render("book_form", {
		title: 'Update Book',
		book: book,
		genres: allGenres,
		authors: allAuthors
	});
});

// Handle book update on POST.
const book_update_post = [

	// convert the genre to an array
	(req, res, next) => {
		if (!Array.isArray(req.body.genre)) {
			req.body.genre = typeof req.body.genre === 'undefined' ? [] 
			: [req.body.genre];
		}
		next();
	},

	// validation and sanitization
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("author", "Author must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("genre.*").escape(),

	// process the request
	expressAsyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		const validatedResult = matchedData(req);

		console.log(validatedResult);
		console.log(req.params)
		console.log(req.body)

		const book = new Book({
			title: validatedResult.title,
			author: validatedResult.author,
			summary: validatedResult.summary,
			isbn: validatedResult.isbn,
			genre: typeof validatedResult.genre === "undefined" ? [] : validatedResult.genre,
			_id: req.params.id
		})

		if (!errors.isEmpty()) {

			const [allAuthors, allGenres] = await Promise.all([
				Author.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec()
			])

			for (const genre of allGenres) {
				if (book.genre.indexOf(genre._id) > -1) genre.checked = 'true';
			}

			return res.render("book_form", {
				title: "Update Book",
				authors: allAuthors,
				genres: allGenres,
				book: book,
				errors: errors.array()
			});

		} else {
			const updatedBook = await Book.findByIdAndUpdate(req.params.id, book, {});

			res.redirect(updatedBook.url);
		}


	})
];

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
