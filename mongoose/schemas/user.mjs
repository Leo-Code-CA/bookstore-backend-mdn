import { DateTime } from 'luxon';
import mongoose from 'mongoose';
// import { EmployeeSchema } from './employee.mjs';
// import { MemberSchema } from './member.mjs';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 20,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 100,
	},
	user_type: {
		type: String,
		enum: ['member', 'employee'],
		required: true,
		default: 'member',
	},
	joining_date: {
		type: Date,
		default: new Date(),
		required: true,
	},
});

UserSchema.virtual('jd').get(function () {
	return DateTime.fromJSDate(this.joining_date).toLocaleString(DateTime.DATE_MED);
});

export const User = mongoose.model('User', UserSchema);

// employee_profile: EmployeeSchema,
// member_profile: MemberSchema,
