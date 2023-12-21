const jwt = require("jsonwebtoken");

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.getNote = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].split(' ')[1];

		if (!token) {
			return responseGenerator(req, res, 400, 'Please provide a token');
		}

		if (!req.params.id) {
			return responseGenerator(req, res, 400, 'Please provide note id');
		}

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

		const note = await db.Note.findOne({
			where: {
				id: req.params.id,
				userId: decoded.id
			}
		});

		if (!note) {
			return responseGenerator(req, res, 404, 'error', 'Note not found');
		}

		const { UserId: _, ...noteData } = note.dataValues;

		return responseGenerator(req, res, 200, 'success', noteData);
	} catch (error) {
		next(error);
	}
}