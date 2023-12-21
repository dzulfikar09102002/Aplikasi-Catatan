const logger = require('../logger');
const response = require('../response');

describe('response', () => {
	it('should import logger module', () => {
		expect(logger).toBeDefined();
	});

	it('should import response module', () => {
		expect(response).toBeDefined();
	});

	it('should log response', () => {
		logger.logResponse = jest.fn();

		const req = {
			id: '1234'
		};

		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		};

		const status = 200;
		const message = 'message';
		const data = 'data';

		response.responseGenerator(req, res, status, message, data);
		expect(logger.logResponse).toHaveBeenCalledWith(req.id, res, status);
	});
});