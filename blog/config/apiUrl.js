
//文件作用：把从中台来的远程数据库资源都整理到一起，前端要用远程数据，
//就引入本文件，然后选择里面的远程资源，和中台中的router/default.js对接
let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList' ,  //  首页文章列表接口
    getMessageList:ipUrl + 'getMessageList' ,  //  留言列表接口
    getArticleById:ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
    getTypeInfo:ipUrl + 'getTypeInfo',  // 获取文章的类别接口
    getListById:ipUrl + 'getListById/',  // 根据类别Id获取文章列表


}
export default servicePath;