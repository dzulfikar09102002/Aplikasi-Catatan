const jwt = require('jsonwebtoken');

const db = require('../../models');
const { responseGenerator } = require("../../utils/response");

exports.getUser = async (req, res, next) => {
	try {
		const accessToken = req.cookies.refreshToken;

		if (!accessToken) return responseGenerator(req, res, 401, 'Invalid token');

		jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
			if (err) return responseGenerator(req, res, 403, 'Invalid token');
			const user = await db.User.findAll({
				where: {
					id: decoded.id
				}
			});

			if (!user[0]) return responseGenerator(req, res, 403, 'Invalid token');

			const userId = user[0].id;
			const name = user[0].name;
			const email = user[0].email;

			return responseGenerator(req, res, 200, 'success', { userId, name, email });
		});

	} catch (error) {
		next(error);
	}
}