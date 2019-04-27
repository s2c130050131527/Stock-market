import { TickerModel, CompanyModel } from './data.model';
class DataService {
	async getCompanyInfo(companyName) {
		console.log(companyName);
		try {
			const company = await CompanyModel.findOne({
				Name: companyName,
			});
			if (company) {
				return {
					status: 200,
					response: company,
				};
			}
			return {
				status: 404,
				response: 'No company Found with Name : ' + companyName,
			};
		} catch (err) {
			return {
				status: 500,
				response: 'Internal Server Error',
			};
		}
	}

	async getTickerBySymbol(symbol) {
		console.log(symbol);
		try {
			const ticker = await TickerModel.find({
				symbol,
			});
			if (ticker) {
				return {
					status: 200,
					response: ticker,
				};
			}
			return {
				status: 404,
				response: 'No ticker Found',
			};
		} catch (err) {
			return {
				status: 500,
				response: 'Internal Server Error',
			};
		}
	}
	async getTickersInfo(tickers, startDate, endDate) {
		console.log(startDate, 'start');
		let date;
		if (startDate && endDate) {
			date = {
				$gte: new Date(startDate).toISOString(),
				$lte: new Date(endDate).toISOString(),
			};
		}
		try {
			const ticker = await TickerModel.find({
				symbol: { $in: tickers },
				date,
			});
			if (ticker) {
				return {
					status: 200,
					response: ticker,
				};
			}
			return {
				status: 404,
				response: 'No ticker Found',
			};
		} catch (err) {
			console.log(err);
			return {
				status: 500,
				response: 'Internal Server Error',
			};
		}
	}
}

export default new DataService();
