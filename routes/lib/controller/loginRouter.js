const model = require('../model');
const hash = require('../../modules/hash');

class Login {
    constructor() {

    }

    async loginByUsername(ctx, next) {
        let userName = ctx.request.body.username;
        let passWord = ctx.request.body.password;
		let sqlData = await model.usersModel.findAll({
			where: {userName: userName}
        });
        const data = JSON.stringify(sqlData);
        const result = JSON.parse(data);
		if( result.length !==0 ){
            if(result[0].passWord === hash.sha(passWord)){
				ctx.body = {
					'code': 1,
					'data': result,
					'message': '操作成功',
					'success': true
				};
            } else {
				ctx.body = {
					'code': 3,
					'message': '密码错误，请重新输入！',
					'success': true
				};
            }
		} else {
			ctx.body = {
				'code': 2,
				'message': '用户不存在',
				'success': true
			};
        }
    }

    async getUserInfo (ctx, next){
		let { token } = ctx.request.query;
		let sqlData = await model.usersModel.findAll({
			where: {userName: token},
			attributes: [
				'id',
				'userName',
				'token',
				'userPhone',
				'userState',
				'permissions',
				'introduction',
				'avatar'
			]
		});
		const data = JSON.stringify(sqlData);
		const result = JSON.parse(data)[0];
        ctx.body = {
            'code': 1,
            'data': result,
            'message': '操作成功',
            'success': true
        };
    }

    async getResourcesRouter(ctx, next) {
		let permissions = ctx.request.body.permissions;
		let sqlPermissData = await model.permissionsModel.findAll({
			where: {id: permissions}
		});
		const permissData = JSON.stringify(sqlPermissData);
		const permissResult = JSON.parse(permissData);
        const powerData = permissResult[0].power;
		const power = powerData.split(',');
		let sqlResourcesData = await model.resourcesModel.findAll({
			where: {
				id: {
					[model.resourcesModel.Op.or]: power
				}
			}
		});
		const ResourcesData = JSON.stringify(sqlResourcesData);
		const ResourcesResult = JSON.parse(ResourcesData);
		ctx.body = {
            'code': 1,
            'data': ResourcesResult,
            'message': '操作成功',
            'success': true
        };
    }
};
module.exports = new Login();