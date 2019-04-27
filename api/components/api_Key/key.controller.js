import KeyService from './key.service';
import uuid from 'uuid/v4';

class KeyController {
	constructor() {}

	async create(req, res, next) {
		const permissions = req.body.permissions;
		const api_key = uuid();
		const response = await KeyService.createApiKey({
			api_key,
			permissions,
		});
		res.status(response.status).json({
			message: response.response || response.error,
		});
		next();
	}

	async validate(req, res, next) {
		const api_key = req.query.api_key;
		const api_name = req.api_name;
		if (!api_key || !api_name) {
			res.status(200).json({
				message: 'Bad Request',
			});
			next();
		}
		const response = await KeyService.getPermissionsFromApiKey(api_key);
		if (response.status === 200) {
			if (response.response.includes(api_name)) {
				next();
			} else {
				res.status(response.status).json({
					message: 'Error' + response.response,
				});
			}
		} else {
			res.status(response.status).json({
				message: response.error,
			});
		}
	}
}

export default new KeyController();
