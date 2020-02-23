'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.body = 'api';
    }

    //下面这些函数都由/router/default.js来配置路由，即对外暴露的地址
    //有输入参数的，前端传来的参数即this.ctx.params.xx，xx在路由中写好
    //函数返回值为this.ctx.body

    //获取文章列表页
    async getArticleList(){
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'WHERE is_ok=1'
        const results = await this.app.mysql.query(sql)
        this.ctx.body={
            data:results
        }
    }

    //获取文章详细内容
    async getArticleById(){
        //先配置路由的动态传值，然后再接收值
        //从前端获得id
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName ,'+
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'WHERE article.id='+id



        const result = await this.app.mysql.query(sql)

        //返回值
        this.ctx.body={data:result}

    }

    //得到header导航栏类别名称和编号
    async getTypeInfo(){

        const result = await this.app.mysql.select('type')
        this.ctx.body = {data:result}

    }

    //根据类别ID获得文章列表
    async getListById(){
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'WHERE type_id='+id+' AND is_ok=1'
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}

    }

    //获得留言列表(只选择is_ok=1的留言，即后台允许发布的留言)
    async getMessageList(){

        let sql = 'SELECT message.who as who,'+
            'message.message as message,'+
            'message.id as id '+
            'FROM message '+
            'WHERE is_ok=1'

        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}

    }

    //添加留言
    async addMessage(){

        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('message',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        //返回两个参数，第一个是是否保存成功
        this.ctx.body={
            isSuccess:insertSuccess,
        }
    }

}

module.exports = HomeController;
