const { getUser } = require('./getUser');
const { register } = require('./register');
const { login } = require('./login');
const { refreshToken } = require('./refreshToken');
const { logout } = require('./logout');

module.exports = {
	getUser,
	register,
	login,
	refreshToken,
	logout
}
