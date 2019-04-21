import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(logger('dev'));

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

export const App = app;
