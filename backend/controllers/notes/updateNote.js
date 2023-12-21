const jwt = require("jsonwebtoken");

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.updateNote = async (req, res, next) => {
	try {
		const token = req.cookies.refreshToken;

		if (!token) {
			return responseGenerator(req, res, 400, 'Invalid token');
		}

		if (!req.params.id) {
			return responseGenerator(req, res, 400, 'Please provide note id');
		}

		const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

		const note = await db.Note.findOne({
			where: {
				id: req.params.id,
				userId: decoded.id
			}
		});

		if (!note) {
			return responseGenerator(req, res, 404, 'error', 'Note not found');
		}

		note.title = req.body.title;
		note.body = req.body.body;
		await note.save();
		return responseGenerator(req, res, 200, 'success', note);
	} catch (error) {
		next(error);
	}
}