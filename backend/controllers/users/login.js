const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return responseGenerator(req, res, 400, 'Please fill all fields');
		}

		const user = await db.User.findOne({
			where: {
				email: email,
			},
		});

		if (!user) {
			return responseGenerator(req, res, 400, 'User not found');
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return responseGenerator(req, res, 400, 'Incorrect password');
		}

		const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '1h'
		});
		const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '1d'
		});

		await db.User.update({ refresh_token: refreshToken }, {
			where: {
				id: user.id
			}
		});

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000 // 1 day
		});

		return responseGenerator(req, res, 200, 'success', { token: accessToken });
	} catch (error) {
		next(error);
	}
}