import mongoose from 'mongoose';
import { DateTime } from 'luxon';

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

AuthorSchema.virtual('dob_formatted').get(function () {
	return this.date_of_birth ?
			DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
		:	'';
});

AuthorSchema.virtual('dod_formatted').get(function () {
	return this.date_of_death ?
			DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
		:	'';
});

export const Author = mongoose.model('Author', AuthorSchema);
