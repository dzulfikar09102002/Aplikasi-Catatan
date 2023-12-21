const jwt = require('jsonwebtoken');

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.refreshToken = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (!refreshToken) return res.sendStatus(401);
		const user = await db.User.findAll({
			where: {
				refresh_token: refreshToken
			}
		});

		if (!user[0]) return res.sendStatus(403);

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) return res.sendStatus(403);
			const userId = user[0].id;
			const name = user[0].name;
			const email = user[0].email;
			const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
				expiresIn: '15s'
			});

			return responseGenerator(req, res, 200, 'success', { token: accessToken });
		});
	} catch (error) {
		next(error);
	}
}
