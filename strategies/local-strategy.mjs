import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.mjs';
import { checkPassword } from '../utils/password_crypt.mjs';

passport.serializeUser((user, done) => {
	console.log('Inside serialize user');
	console.log(user);
	done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
	console.log('Inside deserialize user');
	console.log(userId);
	try {
		const findUser = await User.findById(userId);
		if (!findUser) throw new Error('User not found');
		done(null, findUser);
	} catch (error) {
		console.log(error);
		done(error, null);
	}
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		console.log('inside passport use');
		try {
			const findUser = await User.find({ username: username }).exec();
			if (!findUser) throw new Error('User not found');
			if (!checkPassword(password, findUser.password)) throw new Error('Wrong password');
			done(null, findUser);
		} catch (error) {
			console.log(error);
			done(error, null);
		}
	})
);
