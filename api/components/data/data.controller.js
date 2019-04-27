import DataService from './data.service';

class DataController {
	async company(req, res, next) {
		const companyName = req.query.company_name;
		const company = await DataService.getCompanyInfo(companyName);
		if (company.status === 200) {
			delete company.response._id;
			const responseObj = {
				company_name: companyName,
				info: company.response,
			};
			const tickers = await DataService.getTickerBySymbol(
				company.response.Symbol
			);
			responseObj.tickers = tickers.response.map(el => {
				const { date, low, high, open, close, volume } = el;
				return { date, low, high, open, close, volume };
			});
			res.status(tickers.status).json({
				message: responseObj,
			});
		} else {
			res.status(company.status).json({
				message: company.response,
			});
		}

		next();
	}

	async stocksintime(req, res, next) {
		const tickers = req.query.ticker_list;
		const startDate = req.query.start_date;
		const endDate = req.query.end_date;
		const tickerRes = await DataService.getTickersInfo(
			tickers,
			startDate,
			endDate
		);
		if (tickerRes.status === 200) {
			const responseObj = [];
			tickers.forEach(el => {
				const obj = {
					name: el,
				};
				obj.ticker_list = tickerRes.response
					.filter(tickerObj => tickerObj.symbol === el)
					.map(elem => ({
						high: elem.high,
						low: elem.low,
						close: elem.close,
						date: elem.date,
					}));
				obj.count = obj.ticker_list.length;
				responseObj.push(obj);
			});
			res.status(tickerRes.status).json({
				message: responseObj,
			});
		} else {
			res.status(tickerRes.status).json({
				message: tickerRes.response,
			});
		}
		next();
	}

	async tickersearch(req, res, next) {
		const tickers = [req.query.ticker_name];
		const tickerRes = await DataService.getTickersInfo(
			tickers,
			1,
			new Date().getTime()
		);
		const responseObj = {};
		responseObj.ticker_name = tickers[0];
		responseObj.ticker_list = tickerRes.response.map(el => {
			const { date, low, high, open, close, volume } = el;
			return { date, low, high, open, close, volume };
		});
		responseObj.count = responseObj.ticker_list.length;
		if (tickerRes.status === 200) {
			res.status(tickerRes.status).json({
				message: responseObj,
			});
		} else {
			res.status(tickerRes.status).json({
				message: tickerRes.response,
			});
		}
		next();
	}
}

export default new DataController();
