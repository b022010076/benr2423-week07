const MongoClient = require("mongodb").MongoClient;

require('dotenv').config()
const mongoPath = process.env.MONGOPATH

const User = require('./util/user');

describe("User Account", () => {
	let client;
	beforeAll(async () => {
		client = await MongoClient.connect(
			mongoPath,
			{ useNewUrlParser: true },
		);
		User.injectDB(client);
	})

	afterAll(async () => {
		await client.close();
	})

	test("New user registration", async () => {
		const res = await User.register("test", "test")
		expect(res).toBe(true)
	})

	test("Duplicate username", async () => {
		const res = await User.register("test", "test")
		expect(res).toBe(true)
	})

	test("User login invalid username", async () => {
		const res = await User.login("test1", "test")
		expect(res).toBe(false)
	})

	test("User login invalid password", async () => {
		const res = await User.login("test", "test1")
		expect(res).toBe(false)
	})

	test("User login successfully", async () => {
		const res = await User.login("test", "test")
		expect(res).toBeInstanceOf(Object)
	})
});