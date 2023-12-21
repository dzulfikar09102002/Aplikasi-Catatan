require('dotenv').config();
const express = require('express');
const { appSetup } = require('./libs/app-setup');
const { loggerSetup } = require('./libs/logger-setup');
const { sequelize } = require('./models')

const app = express();

async function main() {
	try {
		appSetup(app);
		loggerSetup(app);

		await sequelize.authenticate();
		app.use('/api/user', require('./routes/user'));
		app.use('/api/notes', require('./routes/notes'));

		app.listen(3001, () => {
			console.log('Server running on port 3001');
		});
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}

main();