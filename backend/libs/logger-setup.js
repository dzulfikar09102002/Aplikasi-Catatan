const morgan = require('morgan');
const logger = require('../utils/logger');

exports.loggerSetup = (app) => {
	morgan.token('id', function getId(req) {
		return req.id
	});

	app.use(morgan(logger.loggerFormat, {
		skip: function (req, res) {
			return res.statusCode < 400
		},
		stream: process.stderr
	}));

	app.use(morgan(logger.loggerFormat, {
		skip: function (req, res) {
			return res.statusCode >= 400
		},
		stream: process.stdout
	}));

	app.use((req, res, next) => {
		const log = logger.loggerInstance.child({
			id: req.id,
			body: req.body
		}, true)

		log.info({
			req: req
		})
		next();
	});

	app.use((req, res, next) => {
		function afterResponse() {
			res.removeListener('finish', afterResponse);
			res.removeListener('close', afterResponse);
			const log = logger.loggerInstance.child({
				id: req.id
			}, true)
			log.info({ res: res }, 'response')
		}

		res.on('finish', afterResponse);
		res.on('close', afterResponse);
		next();
	});

}