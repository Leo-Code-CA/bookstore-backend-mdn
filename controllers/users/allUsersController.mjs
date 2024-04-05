import expressAsyncHandler from 'express-async-handler';

// Display login form form on GET.
const users_login_get = (req, res, next) => {
	res.render('login', {
		title: 'Login Page',
	});
};

// Handle user login on POST.
const users_login_post = expressAsyncHandler(async (req, res, next) => {
	res.send('POST request login enpoint - NOT SET UP YET');
});

const all_users_controller = {
	users_login_get,
	users_login_post,
};

export default all_users_controller;
