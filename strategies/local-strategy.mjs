import passport from 'passport';
import { Strategy } from 'passport-local';
import { User, MemberUser, EmployeeUser } from '../mongoose/schemas/user.mjs';
import bcrypt from 'bcrypt';

passport.serializeUser((user, done) => {
	done(null, { id: user.id, kind: user.user_type });
});

passport.deserializeUser(async ({ id, kind }, done) => {
	try {
		if (kind === 'employee') {
			const findEmployee = await EmployeeUser.findById(id);
			if (!findEmployee) throw new Error('Employee not found');
			done(null, findEmployee);
		} else {
			const findMember = await MemberUser.findById(id);
			if (!findMember) throw new Error('Member not found');
			done(null, findMember);
		}
	} catch (error) {
		done(error, null);
	}
});

export default passport.use(
	new Strategy(async (username, password, done) => {
		try {
			console.log(`username: ${username}, password: ${password}`);
			// check if the user exists in the db
			const checkUsers = await Promise.all([
				EmployeeUser.findOne({ username: username }),
				MemberUser.findOne({ username: username }),
			]);
			console.log('CheckUsers is:');
			console.log(checkUsers);

			const findUser = checkUsers.filter(user => user);

			if (findUser.length === 0) return done(null, false, { error: 'Incorrect username' });
			// check if the passwords match
			const passwordsMatch = await bcrypt.compare(password, findUser[0].password);
			if (passwordsMatch) {
				return done(null, findUser[0]);
			} else {
				return done(null, false, { error: 'Incorrect password' });
			}
		} catch (error) {
			done(error, null);
		}
	})
);
