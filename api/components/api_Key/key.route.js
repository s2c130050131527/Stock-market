import KeyController from './auth.controller';

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
			res.status(400).json({
				message: 'Permissions Should be in Array',
			});
		}
	}
}

export default KeyRoutes;
