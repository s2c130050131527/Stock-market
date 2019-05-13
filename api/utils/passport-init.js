import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import { Strategy as FBSrategy } from 'passport-facebook';
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

	passport.use(
		new FBSrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
				callbackURL: process.env.FACEBOOK_CALLBACK,
			},
			(accessToken, refreshToken, profile, done) => {
				done(null, profile);
			}
		)
	);
};
