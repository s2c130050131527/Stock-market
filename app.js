import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import AppRouter from './api/utils/Router';
import passport from 'passport';
import { init } from './api/utils/passport-init';
import DB from './api/utils/db-init';

export const initApp = () => {
	const app = express();

	app.use(cors());
	app.use(logger('dev'));

	app.use(json());
	app.use(urlencoded({ extended: false }));
	app.use(cookieParser());
	// init();
	// app.use(passport.initialize());
	new AppRouter(app);
	new DB().initDB();
	return app;
};
