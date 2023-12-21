const { getNotes } = require('./getNotes');
const { getNote } = require('./getNote');
const { addNote } = require('./addNote');
const { updateNote } = require('./updateNote');
const { deleteNote } = require('./deleteNote');

module.exports = {
	getNotes,
	getNote,
	addNote,
	updateNote,
	deleteNote
}
