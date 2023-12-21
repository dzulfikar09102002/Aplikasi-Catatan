const express = require('express');
const cors = require('cors')
const addRequestId = require('express-request-id')
const cookieParser = require('cookie-parser');

exports.appSetup = (app) => {
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
	app.use(addRequestId());
	app.use(cookieParser());
}