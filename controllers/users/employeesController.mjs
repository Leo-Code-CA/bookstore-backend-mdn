// employees portal on GET.
const employees_portal_get = (req, res, next) => {
	if (req?.user) {
		const {
			params: { userId },
		} = req;
		const {
			user: { _id },
		} = req;
		if (_id.toString() === userId) {
			res.render('employee_portal', {
				title: 'Employee Portal',
				user: req.user,
			});
		}
	} else {
		res.status(401).send('Unauthorized');
	}
};

const employees_controller = {
	employees_portal_get,
};

export default employees_controller;
