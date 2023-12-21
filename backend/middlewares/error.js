const logger = require('../utils/logger');
const { responseGenerator } = require('../utils/response');

exports.errorMiddleware = (error, req, res, next) => {
	const errorStatus = error.status ?? 500;
	const errorMsg = '[notes-app]:[ERROR] ' + (error.message ?? 'Something went wrong');

	if (error instanceof Error) {
		logger.logResponse(req.id, res, errorStatus);
		return responseGenerator(req, res, errorStatus, { message: errorMsg, data: error.stack });
	}
	next(error);
}
