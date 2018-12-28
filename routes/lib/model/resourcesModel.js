const db = require('../db');
module.exports = db.defineModel('resources_table', {
	label: db.STRING(255),
	describe: db.STRING(255),
	type: db.STRING(255),
	sortId: db.STRING(255),
	parentId: db.STRING(255),
	componentPath: db.STRING(255),
	routePath: db.STRING(255),
	api: db.STRING(255),
	icon: db.STRING(255)
});
module.exports.Op = db.Op;