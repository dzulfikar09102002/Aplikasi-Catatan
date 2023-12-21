const logger = require('./logger');

exports.responseGenerator = (req, res, status, message, data) => {
	logger.logResponse(req.id, res, status);
	return res.status(status).json({
		message,
		data
	});
}
