const db = require('../db');
module.exports = db.defineModel('users_table', {
	userName: db.STRING(255),
	passWord: db.STRING(255),
	token: db.STRING(255),
	userPhone: db.STRING(255),
	userState: db.STRING(255),
	permissions: db.STRING(255),
	introduction: db.STRING(255),
	avatar: {
		type: db.STRING(255),
		defaultValue: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
	}
});
module.exports.Op = db.Op;