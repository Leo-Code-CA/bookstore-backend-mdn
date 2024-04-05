import mongoose, { Schema } from 'mongoose';

const MemberSchema = new mongoose.Schema({
	membership_status: {
		type: String,
		enum: ['newcomer', 'regular', 'veteran'],
		default: 'newcomer',
		required: true,
	},
	loaned_book_instances: [
		{
			type: Schema.Types.ObjectId,
			ref: 'BookInstance',
		},
	],
	_id: false,
});

export const Member = mongoose.model('Member', MemberSchema);
