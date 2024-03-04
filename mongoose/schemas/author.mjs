import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	family_name: {
		type: String,
		required: true,
		maxLength: 100,
	},
	date_of_birth: {
		type: Date,
	},
	date_of_death: {
		type: Date,
	},
});

AuthorSchema.virtual('name').get(function () {
	let fullname = '';
	if (this.first_name && this.family_name) {
		fullname = `${this.first_name}, ${this.family_name}`;
	}
	return fullname;
});

AuthorSchema.virtual('url').get(function () {
	return `/catalog/author/${this._id}`;
});

export const Author = mongoose.model('Author', AuthorSchema);
