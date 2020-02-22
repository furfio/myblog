'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        //首页的文章列表数据
        //this.ctx: 当前请求的上下文 Context 对象的实例

        this.ctx.body='hi api'
    }

    //判断用户名密码是否正确
    async checkLogin(){
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '"+userName +
            "' AND password = '"+password+"'"

        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            //登录成功,进行session缓存
            //用时间戳做session，并不安全
            let openId=new Date().getTime()
            this.ctx.session.openId={ 'openId':openId }
            //把openID传回登录页面，这样前台就不用查询数据库了，节省资源
            this.ctx.body={'data':'登录成功','openId':openId}

        }else{
            this.ctx.body={data:'登录失败'}
        }
    }

    //后台文章分类信息
    async getTypeInfo(){
        //获取数据库里的type表里的东西
        const resType = await this.app.mysql.select('type')
        this.ctx.body={data:resType}
    }

    //添加文章
    async addArticle(){

        let tmpArticle= this.ctx.request.body
        const result = await this.app.mysql.insert('article',tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        //返回两个参数，第一个是是否保存成功，第二个是插入数据的id
        //此id用于日后修改数据时使用
        this.ctx.body={
            isSuccess:insertSuccess,
            insertId:insertId
        }
    }

    //修改文章
    async updateArticle(){
        let tmpArticle= this.ctx.request.body

        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body={
            isSuccess:updateSuccess
        }
    }

    //获得文章列表
    async getArticleList(){

        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.is_ok as is_ok,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'ORDER BY article.id DESC '
            // 根据文章id进行倒序排列
        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}

    }

    //删除文章
    async delArticle(){
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article',{'id':id})
        this.ctx.body={data:res}
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById(){
        let id = this.ctx.params.id

        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.article_content as article_content,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'article.view_count as view_count ,'+
            'type.typeName as typeName ,'+
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body={data:result}
    }

    //获得留言列表
    async getMessageList(){

        let sql = 'SELECT message.who as who,'+
            'message.message as message,'+
            'message.is_ok as is_ok,'+
            'message.id as id '+
            'FROM message'

        const resList = await this.app.mysql.query(sql)
        this.ctx.body={list:resList}

    }
    //把留言变为可见状态
    async allowMessage(){
        let id_message = this.ctx.params.id

        const result = await this.app.mysql.update('message',
            {
                is_ok: 1 //需要修改的数据
            }, {
                where: {
                    id: id_message
                } //修改查询条件
            });
        const updateSuccess = result.affectedRows === 1;
        console.log(updateSuccess)
        this.ctx.body={
            isSuccess:updateSuccess
        }
    }


}

module.exports = MainController