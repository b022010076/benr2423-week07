const MongoClient = require("mongodb").MongoClient;

require('module-alias/register')

const User = require('@util/user');

require('dotenv').config()
const mongoPath = process.env.MONGOPATH

MongoClient.connect(
	mongoPath,
	{ useNewUrlParser: true },
).catch(err => {
	console.error(err.stack)
	process.exit(1)
}).then(async client => {
	console.log('Connected to MongoDB successfully');
	User.injectDB(client);
})
