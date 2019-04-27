import KeyController from './key.controller';

class KeyRoutes {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.post('/api_key', this.validateCreate, KeyController.create);
	}

	validateCreate(req, res, next) {
		const permissions = req.body.permissions;
		console.log(req.body);
		if (Array.isArray(permissions)) {
			const inValid = [];
			permissions.forEach(el => {
				if (!process.env.API_LIST.includes(el)) {
					inValid.push(el);
				}
			});
			if (inValid.length) {
				res.status(400).json({
					message: 'Invalid API keys:' + inValid.join(','),
				});
			}
			next();
		} else {
			if (permissions === '*') {
				req.body.permissions = process.env.API_LIST;
				next();
			}
			res.status(400).json({
				message: 'Permissions Should be in Array',
			});
		}
	}
}

export default KeyRoutes;
