module.exports = app =>{
    const {router,controller} = app
    //adminauth路由守卫（中间件），会再去检查一遍有没有登录，没有登录会直接退回首页
    //防止别人不登录直接访问后台接口，保护后台
    var adminauth=app.middleware.adminauth()
    router.get('/admin/index',controller.admin.main.index)
    //这里是用户名，密码，post比较安全
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
    router.get('/admin/getArticleList',adminauth,controller.admin.main.getArticleList)
    router.get('/admin/getMessageList',adminauth,controller.admin.main.getMessageList)
    router.get('/admin/delArticle/:id',adminauth,controller.admin.main.delArticle)
    router.post('/admin/checkLogin',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',adminauth,controller.admin.main.getTypeInfo)
    router.get('/admin/getArticleById/:id',adminauth,controller.admin.main.getArticleById)
    router.get('/admin/allowMessage/:id',adminauth,controller.admin.main.allowMessage)
}