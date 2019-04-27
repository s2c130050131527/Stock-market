import { Router } from 'express';
import KeyRoutes from '../components/api_Key/key.route';
import DataRoutes from '../components/data/data.route';

class AppRouter {
	constructor(app) {
		this.router = Router();
		this.initRoutes();
		app.use('/api', this.router);
	}

	initRoutes() {
		// new AuthRoutes(this.router);
		new KeyRoutes(this.router);
		new DataRoutes(this.router);
	}
}

export default AppRouter;
