const jwt = require("jsonwebtoken");

const db = require("../../models");
const { responseGenerator } = require("../../utils/response");

exports.getNotes = async (req, res, next) => {
	try {
		// check token
		const accessToken = req.cookies.refreshToken;
		if (!accessToken) return responseGenerator(req, res, 401, 'Invalid token');

		const decoded = jwt.verify(accessToken, process.env.REFRESH_TOKEN_SECRET);

		const notes = await db.Note.findAll({
			where: {
				userId: decoded.id
			}
		});

		const data = notes.map(note => {
			const { UserId: _, ...noteData } = note.dataValues;
			return noteData;
		});

		return responseGenerator(req, res, 200, 'success', data);
	} catch (error) {
		next(error);
	}
}