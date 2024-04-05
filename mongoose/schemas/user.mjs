import mongoose from 'mongoose';
import { Employee } from './employee.mjs';
import { Member } from './member.mjs';

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minLength: 5,
		maxLength: 20,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 30,
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
	employee_profile: Employee,
	member_profile: Member,
});

export const User = mongoose.model('User', UserSchema);
