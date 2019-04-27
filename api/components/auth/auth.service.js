import mongoose from 'mongoose';
import { LoginModel, UserModel } from './auth.model';
class AuthService {
	loginUser(UserObj) {
		console.log(UserObj);
		return new LoginModel(UserObj);
	}

	async addOrUpdateUser(UserObj) {
		const updated = await UserModel.update(
			{ userId: UserObj.userId },
			UserObj,
			{
				upsert: true,
			}
		);
		return updated;
	}
}

export default new AuthService();
