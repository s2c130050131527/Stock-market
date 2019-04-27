import AuthService from './auth.service';

class AuthController {
	callback(req, res, next) {
		next();
	}
}

export default new AuthController();
