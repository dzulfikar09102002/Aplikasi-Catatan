const jwt = require("jsonwebtoken");

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.addNote = async (req, res, next) => {
	try {
		const token = req.cookies.refreshToken;

		if (!token) {
			return responseGenerator(req, res, 400, 'Please provide a token');
		}

		if (!req.body.title || !req.body.body) {
			return responseGenerator(req, res, 400, 'Please fill all fields');
		}

		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		const note = await db.Note.create({
			title: req.body.title,
			body: req.body.body,
			userId: decoded.id
		});

		return responseGenerator(req, res, 200, 'success', note);
	} catch (error) {
		next(error);
	}
}
