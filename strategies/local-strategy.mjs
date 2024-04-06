import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../mongoose/schemas/user.mjs';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
	try {
		const findUser = await User.findById(userId);
		if (!findUser) throw new Error('User not found');
		done(null, findUser);
	} catch (error) {
		done(error, null);
	}
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			console.log(`username: ${username}, password: ${password}`);
			// check if the user exists in the db
			const findUser = await User.findOne({ username: username });
			if (!findUser) return done(null, false, { error: 'Incorrect username' });
			// check if the passwords match
			const passwordsMatch = await bcrypt.compare(password, findUser.password);
			if (passwordsMatch) {
				return done(null, findUser);
			} else {
				return done(null, false, { error: 'Incorrect password' });
			}
		} catch (error) {
			done(error, null);
		}
	})
);
