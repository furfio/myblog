//前台路由配置
module.exports = app =>{
    const {router,controller} = app
    //下面的两个参数第一个是浏览器中需要输入的访问路径，第二个是对应访问到的组件
    router.get('/default/index',controller.default.home.index)
    router.get('/default/getArticleList',controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id',controller.default.home.getArticleById)
    router.get('/default/getTypeInfo',controller.default.home.getTypeInfo)
    router.get('/default/getListById/:id',controller.default.home.getListById)
}