import mongoose, { Schema } from 'mongoose';

export const EmployeeSchema = new mongoose.Schema({
	position: {
		type: String,
		enum: ['Librarian', 'Stockist', 'Assistant Manager', 'Branch Manager', 'Global Manager'],
		required: true,
	},
	location: {
		type: String,
		enum: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton'],
		required: true,
	},
	full_name: {
		type: String,
		required: true,
	},
	books_added: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Book',
		},
	],
	autors_added: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Author',
		},
	],
	genres_added: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Genre',
		},
	],
	book_instances_added: [
		{
			type: Schema.Types.ObjectId,
			ref: 'BookInstance',
		},
	],
});
