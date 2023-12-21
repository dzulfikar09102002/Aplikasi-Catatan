const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.logout = async (req, res, next) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) return responseGenerator(req, res, 401, 'Invalid token');
		const user = await db.User.findAll({
			where: {
				refresh_token: refreshToken
			}
		});
		if (!user[0]) responseGenerator(req, res, 401, 'Invalid token');
		const userId = user[0].id;
		await db.User.update({ refresh_token: null }, {
			where: {
				id: userId
			}
		});
		res.clearCookie('refreshToken');
		return responseGenerator(req, res, 200, 'success');
	} catch (error) {
		next(error);
	}
}