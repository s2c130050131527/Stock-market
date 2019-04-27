import mongoose from 'mongoose';

const userSchema = {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	accessToken: {
		type: String,
		required: true,
		unique: true,
	},
	imageUrl: {
		type: String,
	},
};

const userCollectionSchema = {
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	imageUrl: {
		type: String,
	},
};

const UserLoginSchema = new mongoose.Schema(userSchema);
const UserStoreCollection = new mongoose.Schema(userCollectionSchema);

UserLoginSchema.index(
	{
		accessToken: 1,
	},
	{ unique: true }
);

UserStoreCollection.index(
	{
		email: 1,
		userId: 1,
	},
	{ unique: true }
);

export const LoginModel = mongoose.model('login', UserLoginSchema);
export const UserModel = mongoose.model('users', UserStoreCollection);
