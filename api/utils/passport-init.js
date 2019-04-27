import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';

passport.serializeUser = (user, done) => {
	done(null, user);
};

export const init = () => {
	passport.use(
		new Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: process.env.GOOGLE_CALLBACK,
			},
			(accessToken, refreshToken, profile, done) => {
				done(null, profile);
			}
		)
	);
};
