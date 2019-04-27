import AuthService from './auth.service';

class AuthController {
	callback(req, res, next) {
		res.status(200).send(req.user);
		next();
	}
}

export default new AuthController();
