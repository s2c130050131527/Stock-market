import mongoose, { model, Schema } from 'mongoose';

const BaseTickerData = {
	date: {
		type: Date,
	},
	symbol: {
		type: String,
		required: true,
	},
	open: { type: Number },
	close: { type: Number },
	low: { type: Number },
	high: { type: Number },
	volume: { type: Number },
};

const CompanyData = {
	Symbol: {
		type: String,
		unique: true,
		required: true,
	},
	Name: {
		type: String,
	},
	Sector: {
		type: String,
	},
	Industry: {
		type: String,
	},
	MarketCap: {
		type: Number,
	},
};

const TickerSchema = new Schema(BaseTickerData);
TickerSchema.index({
	symbol: 1,
});
const CompanySchema = new Schema(CompanyData);
CompanySchema.index(
	{
		Symbol: 1,
		Name: 1,
	},
	{
		unique: true,
	}
);
export const TickerModel = model('stockprice', TickerSchema, 'stockprice');
export const CompanyModel = model('company', CompanySchema, 'company');
