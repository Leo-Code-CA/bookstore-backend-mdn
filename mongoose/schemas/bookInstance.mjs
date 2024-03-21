import mongoose, { Schema } from 'mongoose';
import { DateTime } from 'luxon';

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
		default: 'Maintenance',
	},
	due_back: {
		type: Date,
		default: Date.now,
	},
});

BookInstanceSchema.virtual('url').get(function () {
	return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual('due_back_formatted').get(function () {
	return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

BookInstanceSchema.virtual('due_back_yyyy_mm_dd').get(function() {
	return DateTime.fromJSDate(this.due_back).toISODate(); // due_back or _due_back ?
})

export const BookInstance = mongoose.model('BookInstance', BookInstanceSchema);
