const model = require('../model');
const hash = require('../../modules/hash');
class Users {
	constructor() {

	}

	async getUsersList(ctx, next) {
		let { page, limit } = ctx.request.query;
		let sqlUsersData = await model.usersModel.findAll({
			attributes: [
				'id',
				'userName',
				'passWord',
				'token',
				'userPhone',
				'userState',
				'permissions',
				'introduction',
				'avatar'
			]
		});
		const usersData = JSON.stringify(sqlUsersData);
		const usersResult = JSON.parse(usersData);
		usersResult.forEach( item => {
			item.passWord = hash.desha(item.passWord)
		})
		if( usersResult.length !==0 ){
			ctx.body = {
				'code': 1,
				'data': usersResult,
				'total': usersResult.length,
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

	async createUsers(ctx, next) {
		const reqData = ctx.request.body;
		const createData = {
			userName: reqData.userName,
			passWord: hash.sha(reqData.passWord),
			token: reqData.userName,
			userPhone: reqData.userPhone,
			userState: reqData.userState,
			permissions: reqData.permissions,
			introduction: reqData.introduction,
			avatar: reqData.avatar===''?reqData.avatar='https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif':reqData.avatar

		}
		await model.usersModel.create(createData).then( newUsers => {
			ctx.body = {
				'code': 1,
				'data': 'success',
				'message': '操作成功',
				'success': true
			};
		}).catch( err => {
			ctx.body = {
				'code': 2,
				'data': err,
				'message': '操作成功',
				'success': true
			};
		});
	}

	async updateUsers(ctx, next) {
		const reqData = ctx.request.body;
		const createData = {
			userName: reqData.userName,
			passWord: hash.sha(reqData.passWord),
			token: reqData.userName,
			userPhone: reqData.userPhone,
			userState: reqData.userState,
			permissions: reqData.permissions,
			introduction: reqData.introduction,
			avatar: reqData.avatar
		}
		await model.usersModel.update(createData, {
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
		})
	}

	async delUsers(ctx, next) {
		let { id } = ctx.request.query;
		await model.usersModel.destroy({
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

module.exports = new Users();