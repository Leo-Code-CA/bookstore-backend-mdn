// Member portal on GET.
const member_portal_get = (req, res, next) => {
	console.log(req.user);
	if (req?.user) {
		const {
			params: { userId },
		} = req;
		const {
			user: { _id },
		} = req;
		if (_id.toString() === userId) {
			res.render('member_portal');
		} else {
			res.status(401).send('Unauthorized');
		}
	} else {
		res.status(401).send('Unauthorized');
	}
};

const members_controller = {
	member_portal_get,
};

export default members_controller;
