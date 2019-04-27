import mongoose, { model, Schema } from 'mongoose';

const ApiKeySchema = {
	api_key: {
		type: String,
		required: true,
		unique: true,
	},
	permissions: {
		type: [String],
		required: true,
	},
};

const ApiKey = new Schema(ApiKeySchema);

ApiKey.index(
	{
		api_key: 1,
	},
	{
		unique: true,
	}
);

export const ApiKeyModel = model('api_key', ApiKey);
