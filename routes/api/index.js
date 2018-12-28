const router = require('koa-router')();
const routerModel = require('../lib/controller/index.js');
router.get('/', async (ctx, next) => {
	ctx.response.body = `<h1>Index</h1>`
});
/*登录*/
router.post('/login/login', routerModel.loginRouter.loginByUsername);

router.get('/user/info', routerModel.loginRouter.getUserInfo);

router.post('/resources/getRouter', routerModel.loginRouter.getResourcesRouter);

/*用户管理*/
router.get('/users/getList', routerModel.usersRouter.getUsersList);
router.post('/users/createOne', routerModel.usersRouter.createUsers);
router.post('/users/updateOne', routerModel.usersRouter.updateUsers);
router.get('/users/delUsers', routerModel.usersRouter.delUsers);

/*资源管理*/
router.get('/resources/getAllList', routerModel.resourcesRouter.getAllResources);
router.post('/resources/createOne', routerModel.resourcesRouter.createResources);

/*权限管理*/
router.get('/permissions/getList', routerModel.permissionsRouter.getPermissionsList);
router.post('/permissions/createOne', routerModel.permissionsRouter.createPermissions);
router.post('/permissions/updatePower', routerModel.permissionsRouter.updatePower);
router.post('/permissions/updateOne', routerModel.permissionsRouter.updatePermissions);
router.get('/permissions/delPermissions', routerModel.permissionsRouter.delPermissions);

module.exports = router
