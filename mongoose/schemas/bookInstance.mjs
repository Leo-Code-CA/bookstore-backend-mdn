import mongoose, { Schema } from 'mongoose';

const BookInstanceSchema = mongoose.Schema({
	book: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Book',
	},
	imprint: {
		required: true,
		type: String,
	},
	status: {
		type: String,
		enum: ['Available', 'Loaned', 'Reserved', 'Maintenance'],
		required: true,
		default: 'Mainteance',
	},
	due_back: {
		type: Date,
		default: Date.now,
	},
});

BookInstanceSchema.virtual('url').get(function () {
	return `/catalog/bookinstance/${this._id}`;
});

export const BookInstance = mongoose.model('BookInstance', BookInstanceSchema);
