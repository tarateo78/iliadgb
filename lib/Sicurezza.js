crypto = require('crypto')
require('dotenv').config()

class Sicurezza {

	constructor() {
		this.algorithm = 'aes-192-cbc';
		this.password = process.env.CHIAVE;
		// Use the async `crypto.scrypt()` instead.
		this.key = crypto.scryptSync(this.password, 'salt', 24);
		// Use `crypto.randomBytes` to generate a random iv instead of the static iv
		// shown here.
		this.iv = Buffer.alloc(16, 0); // Initialization vector.
	}

	cifra(clearText) {
		const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

		let encrypted = cipher.update(clearText, 'utf8', 'hex');
		encrypted += cipher.final('hex');
		return encrypted;
		// Prints: e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa
	}

	decifra(encriptText) {
		const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
		let decrypted = decipher.update(encriptText, 'hex', 'utf8');
		decrypted += decipher.final('utf8');
		return decrypted;
	}
}

module.exports = Sicurezza