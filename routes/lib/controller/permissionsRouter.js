const model = require('../model');
class Permissions {
	constructor() {

	}

	async getPermissionsList(ctx, next) {
		const sqlPermissionsData = await model.permissionsModel.findAll()
		const permissionsData = JSON.stringify(sqlPermissionsData);
		const permissionsResult = JSON.parse(permissionsData);
		if( permissionsResult.length !==0 ){
			ctx.body = {
				'code': 1,
				'data': permissionsResult,
				'total': permissionsResult.length,
				'message': '操作成功',
				'success': true
			};
		} else {
			ctx.body = {
				'code': 5,
				'message': '错误',
				'success': true
			};
		}
	}

	async createPermissions(ctx, next) {
		const reqData = ctx.request.body;
		console.log(reqData)
		await model.permissionsModel.create(reqData).then( () => {
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch( err => {
			console.log(err)
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
		});
	}

	async updatePower(ctx, next) {
		const { id, power } = ctx.request.body;
		const powerData = power.join(',')
		const createData = {
			power: powerData
		}
		await model.permissionsModel.update(createData, {
			where:{
				id: id
			}
		}).then(()=>{
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch(err => {
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
		})
	}

	async updatePermissions (ctx, next) {
		const reqData = ctx.request.body;
		console.log(reqData)
		await model.permissionsModel.update(reqData, {
			where:{
				id: reqData.id
			}
		}).then(()=>{
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch(err => {
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
			next()
		})
	}

	async delPermissions (ctx, next) {
		let { id } = ctx.request.query;
		console.log(ctx.request.query)
		await model.permissionsModel.destroy({
			where:{
				id: id
			}
		}).then(()=>{
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch(err=>{
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
			next()
		})
	}

}

module.exports = new Permissions();