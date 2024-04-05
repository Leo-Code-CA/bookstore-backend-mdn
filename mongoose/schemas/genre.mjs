import mongoose from 'mongoose';

const GenreSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
		maxLength: 100,
	},
});

GenreSchema.virtual('url').get(function () {
	return `/catalog/genre/${this._id}`;
});

export const Genre = mongoose.model('Genre', GenreSchema);
