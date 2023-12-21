const bunyan = require('bunyan')

exports.loggerInstance = bunyan.createLogger({
	name: '[notes-app]',
	serializers: {
		req: require('bunyan-express-serializer'),
		res: bunyan.stdSerializers.res,
		err: bunyan.stdSerializers.err
	},
	level: 'info',
	streams: [
		{
			path: './debug.log',
		},
		{
			stream: process.stdout
		}
	]
});

exports.logResponse = function (id, body, statusCode) {
	// hoist the log instance
	var log = this.loggerInstance.child({
		id: id,
		body: body,
		statusCode: statusCode
	}, true);
	log.info('response')
}

exports.loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
