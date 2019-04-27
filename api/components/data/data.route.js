import DataController from './data.controller';
import KeyController from '../api_Key/key.controller';

class DataRoutes {
	constructor(router) {
		this.router = router;
		this.registerRoutes();
	}

	registerRoutes() {
		this.router.get(
			'/company',
			this.validateCompany,
			KeyController.validate,
			DataController.company
		);
		this.router.get(
			'/stocksintime',
			this.validateStockinTime,
			KeyController.validate,
			DataController.stocksintime
		);
		this.router.get(
			'/tickersearch',
			this.validateTickerSearch,
			KeyController.validate,
			DataController.tickersearch
		);
	}

	validateCompany(req, res, next) {
		req.api_name = 'company';
		const company_name = req.query.company_name;
		if (!company_name) {
			res.status(400).json({
				message: 'No company_name present in params',
			});
		}
		next();
	}

	validateStockinTime(req, res, next) {
		req.api_name = 'stocksintime';
		const tickerList = req.query.ticker_list;
		if (!tickerList) {
			res.status(400).json({
				message: 'No ticker_list present in params',
			});
		}
		if (!Array.isArray(tickerList)) {
			req.query.ticker_list = [req.query.ticker_list];
		}
		const startDate = parseInt(req.query.start_date);
		req.query.start_date = parseInt(req.query.start_date);
		const endDate = parseInt(req.query.end_date);
		req.query.end_date = parseInt(req.query.end_date);
		if (!startDate) {
			res.status(400).json({
				message: 'No start_date present in params',
			});
		}
		if (!endDate) {
			res.status(400).json({
				message: 'No end_date present in params',
			});
		}
		next();
	}

	validateTickerSearch(req, res, next) {
		req.api_name = 'tickersearch';
		const tickerList = req.query.ticker_name;
		if (!tickerList) {
			res.status(400).json({
				message: 'No ticker_list present in params',
			});
		}
		if (typeof tickerList !== 'string') {
			res.status(400).json({
				message: 'ticker_name should be a string in params',
			});
		}
		next();
	}
}

export default DataRoutes;
