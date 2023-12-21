const jwt = require("jsonwebtoken");
const { responseGenerator } = require("../utils/response");

exports.verifyToken = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return responseGenerator(req, res, 401, 'Invalid token');

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) return responseGenerator(req, res, 403, 'Invalid token');
		req.email = decoded.email;
		next();
	})
}
