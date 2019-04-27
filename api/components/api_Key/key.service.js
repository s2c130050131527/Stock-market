import { ApiKeyModel } from './key.model';

class KeyService {
	async createApiKey(KeyObject) {
		const keyObj = new ApiKeyModel(KeyObject);
		try {
			const res = await keyObj.save();
			return {
				status: 201,
				response: res.api_key,
			};
		} catch (err) {
			console.log(err);
			return {
				status: 500,
				error: 'Internal Server Error',
			};
		}
	}

	async getPermissionsFromApiKey(apiKey) {
		console.log(apiKey);
		try {
			const res = await ApiKeyModel.findOne(
				{ api_key: apiKey },
				{ permissions: 1, _id: 0 }
			);
			if (!res) {
				return {
					status: 401,
					response: 'API KEY not found',
				};
			}
			return {
				status: 200,
				response: res.permissions,
			};
		} catch (err) {
			console.log(err);
			return {
				status: 500,
				error: 'Internal Server Error',
			};
		}
	}
}

export default new KeyService();
