
//文件作用：把从中台来的远程数据库资源都整理到一起，前端要用远程数据，
//就引入本文件，然后选择里面的远程资源，和中台中的router/admin.js对接
let ipUrl = 'http://127.0.0.1:7001/admin/'

let servicePath = {
    checkLogin:ipUrl+'checkLogin',  //检查用户名和密码
    getTypeInfo:ipUrl+'getTypeInfo',  //获得文章类别信息
    addArticle:ipUrl+'addArticle',//添加文章
    updateArticle:ipUrl+'updateArticle',//修改文章
    getArticleList:ipUrl+'getArticleList',//获取文章列表
    delArticle:ipUrl+'delArticle/',//根据传入的id删除文章
    getArticleById:ipUrl+'getArticleById/',//根据id获得文章详情

}
export default servicePath;