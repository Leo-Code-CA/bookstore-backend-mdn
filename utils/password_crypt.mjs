import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async plainTextPassword => {
	try {
		const cryptedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
		if (cryptedPassword) {
			console.log(cryptedPassword);
			return cryptedPassword;
		}
	} catch (error) {
		console.log(error);
	}
};

export const checkPassword = async (cryptedPassword, plainTextPassword) => {
	const matchPasswords = await bcrypt.compare(plainTextPassword, cryptedPassword);
	return matchPasswords;
};
