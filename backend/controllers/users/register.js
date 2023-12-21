const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.register = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return responseGenerator(req, res, 400, 'Please fill all fields');
		}

		const isUser = await db.User.findOne({
			where: {
				email: email.toLowerCase()
			}
		});

		if (isUser) {
			return responseGenerator(req, res, 400, 'User already exists');
		}

		const beforeUser = await db.User.beforeCreate(async (user, options) => {
			// hash password
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			user.name = name.toLowerCase();
			user.email = email.toLowerCase();
			user.password = hashedPassword;

			return user;
		})

		const newUser = await db.User.create(beforeUser.dataValues);

		const accessToken = jwt.sign({ id: newUser.dataValues.id, email: newUser.dataValues.email }, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: '30s'
		});
		const refreshToken = jwt.sign({ id: newUser.dataValues.id, email: newUser.dataValues.email }, process.env.REFRESH_TOKEN_SECRET, {
			expiresIn: '1d'
		});

		await db.User.update({ refresh_token: refreshToken }, {
			where: {
				id: newUser.dataValues.id
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