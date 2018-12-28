const db = require('../db');

module.exports = db.defineModel('permissions_table', {
	permissName: db.STRING(255),
	permissTitle: db.STRING(255),
	power: {
		type: db.STRING(255),
		defaultValue: ''
	}
});