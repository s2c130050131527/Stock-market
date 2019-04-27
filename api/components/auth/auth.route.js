import AuthController from './auth.controller';
import Passport from 'passport';

class AuthRoutes {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get('/', (req, res) => {
			res.status(200).send('Hello World');
		});
		this.router.get(
			'/login',
			Passport.authenticate('google', {
				scope: ['email', 'profile'],
			})
		);
		this.router.get(
			'/callback',
			Passport.authenticate('google', {
				session: false,
			}),
			AuthController.callback
		);
	}
}

export default AuthRoutes;
