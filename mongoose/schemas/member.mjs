import mongoose, { Schema } from 'mongoose';

export const MemberSchema = new mongoose.Schema({
	membership: {
		type: String,
		enum: ['Newcomer', 'Regular', 'Veteran'],
		default: 'newcomer',
		required: true,
	},
	local_branch: {
		type: String,
		enum: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Edmonton'],
		required: true,
	},
	favorite_genres: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Genre',
		},
	],
	loaned_book_instances: [
		{
			type: Schema.Types.ObjectId,
			ref: 'BookInstance',
		},
	],
	favorite_books: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Book',
		},
	],
});
