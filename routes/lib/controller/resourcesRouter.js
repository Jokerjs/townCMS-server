const model = require('../model');
class Resources {
	constructor() {

	}
	async getAllResources(ctx, next) {
		let sqlAllResourData = await model.resourcesModel.findAll({
			attributes: [
				'id',
				'label',
				'describe',
				'type',
				'sortId',
				'parentId',
				'componentPath',
				'routePath',
				'api',
				'icon'
			]
		});
		const AllResourData = JSON.stringify(sqlAllResourData);
		const AllResourResult = JSON.parse(AllResourData);
		if( AllResourResult.length !==0 ){
			ctx.body = {
				'code': 1,
				'data': AllResourResult,
				'total': AllResourResult.length,
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

	async createResources(ctx, next) {
		const reqData = ctx.request.body;
		console.log(reqData)
		const createData = {
			label: reqData.label,
			describe: reqData.describe,
			type: reqData.type,
			sortId: reqData.sortId,
			parentId: reqData.parentId,
			componentPath: reqData.componentPath,
			routePath: reqData.routePath,
			api: reqData.api,
			icon: reqData.icon
		};
		await model.resourcesModel.create(createData).then( () => {
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch( err => {
			console.log('failed: ' + err);
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
		});
	}

}

module.exports = new Resources();