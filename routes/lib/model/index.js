const Sequelize = require('sequelize');
const config = require('../../../config/config');

const sequelize = new Sequelize(config.sql.database, config.sql.user, config.sql.password, {
	host: config.sql.host,
	dialect: 'mysql',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		idle: 30000
	}
});

const LoginModel = sequelize.define('users_table', {
	userId: {
		type: Sequelize.BIGINT(11),
		primaryKey: true
	},
	userName: Sequelize.STRING(255),
	passWord: Sequelize.STRING(255),
	token: Sequelize.STRING(255),
	userPhone: Sequelize.STRING(255),
	userState: Sequelize.STRING(255),
	permissions: Sequelize.STRING(255),
	introduction: Sequelize.STRING(255),
	avatar: Sequelize.STRING(255)
}, {
	timestamps: false
});

module.exports = LoginModel