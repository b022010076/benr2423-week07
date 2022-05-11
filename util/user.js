const bcryptjs = require('bcryptjs')
let users;

class User {
	static async injectDB(conn) {
		users = await conn.db("parking-lot").collection("customer-db")
	}

	static async register(username, password) {
		// TODO: Check if username exists
		const result = await users.findOne({
			username
		})

		if (users.countDocuments() > 0) {
			if (result) return false
		}
		else {
			if (result) return true
		}

		// TODO: Hash password
		const saltRounds = 5
		var hashedPass = bcryptjs.hashSync(password, saltRounds)

		// TODO: Save user to database
		const insertResult = await users.insertOne({
			username,
			password: hashedPass,
			bookingStatus: {
				verified: true,
				id: 'ADMIN_RESERVE'
			},
			bookings_ids: '1'
		})

		return true
	}

	static async login(username, password) {
		// TODO: Check if username exists
		const result = await users.findOne({
			username
		})

		if (!result) return false

		// TODO: Validate password
		var validatePass = await bcryptjs.compare(password, result.password)

		if (!validatePass) return validatePass

		// TODO: Return user object
		return result
	}
}

module.exports = User;