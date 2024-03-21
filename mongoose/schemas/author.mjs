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

AuthorSchema.virtual('lifespan').get(function () {
	const dob = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 'unknown';
	const dod = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'now';
	return `${dob} - ${dod}`;
});

AuthorSchema.virtual('dob_yyyy_mm_dd').get(function() {
	return this.date_of_birth && DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('dod_yyyy_mm_dd').get(function() {
	return this.date_of_death && DateTime.fromJSDate(this.date_of_death).toISODate();
})

export const Author = mongoose.model('Author', AuthorSchema);
