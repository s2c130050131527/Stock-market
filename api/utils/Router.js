import AuthRoutes from '../components/auth/auth.route';
import { Router } from 'express';

class AppRouter {
	constructor(app) {
		this.router = Router();
		this.initRoutes();
		app.use('/api', this.router);
	}

	initRoutes() {
		new AuthRoutes(this.router);
	}
}

export default AppRouter;
