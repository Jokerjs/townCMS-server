const crypto = require('crypto');

const secret = 'abcdefg_@@&jijoi';
module.exports={
	sha: (str) => {
		const cipher = crypto.createCipher('aes192', secret);
		let crypted = cipher.update(str, 'utf-8', 'hex');
		crypted += cipher.final('hex');
		return crypted;
	},
	desha: (str) => {
		const decipher  = crypto.createDecipher('aes192', secret);
		let decrypted = decipher.update(str, 'hex', 'utf-8');
		decrypted += decipher.final('utf-8');
		return decrypted;
	}
};