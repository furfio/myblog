// 登录成功的话中台会返回一个session给后台，作为后台成功登录的证据
// 中台的路由守卫会在后台访问中台的数据接口时检查后台有没有这个session。
// 如果没有session，就不允许访问中台对应的接口，防止恶意用户不登陆直接进入管理员操作界面的地址
// 也没办法作对应的操作。这样就实现了接口的安全。
module.exports = options =>{
    return async function adminauth(ctx,next){
        console.log(ctx.session.openId)
        if(ctx.session.openId){
            await next()
        }else{
            ctx.body={data:'没有登录'}
        }
    }
}