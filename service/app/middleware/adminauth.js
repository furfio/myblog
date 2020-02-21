// 登录后，我们生成了session，通过后台是不是存在对应的session，
// 作一个中台的路由守卫。如果没有登录，是不允许访问后台对应的接口，
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