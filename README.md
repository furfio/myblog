# 0、系统开发与维护
项目部署在http://116.62.42.148 
## 0.1、项目基本结构

前端  Next.js（也是React框架），后台：React框架，UI利用Ant Design 前台显示文章，留言等，后台编辑，管理，发布这些东西

中台：Egg.js （基于Koa），用于配置mysql数据库的访问接口，即给后台接口，让后台可以对数据库进行增删改查，给前台接口，让前台可以对数据库进行查询。并且设置路由保护（即检查访问后台页面的用户有没有正确登录时中台发给它的session，防止恶意用户不经过登录就直接进入后台路径）

## 0.2  项目路由配置

前台：next.js自动配置路由，浏览器打开就是pages文件夹下的index文件，/list就打开pages里的list.js

中台：egg.js 路由配置在router.js中，这是总的路由，前台和后台路由分别在router文件夹里的default和admin中配置

后台，普通的react应用，用react-router-dom配置，在src/pages/main.js，以及AdminIndex.js文件中配置其他文件的路由

```js
<Router>
    <Route path="/" exact component={Login} />
    <Route path="/index/"  component={AdminIndex} />
</Router>
```

## 0.3 前后台如何与中台接口交互

### 中台结构

- 中台的/app/router.js是总的路由配置，由它来配置/app/router文件夹下的admin.js和default.js两个后台和前台的路由配置文件。

- /config文件中配置数据库连接等参数

- /app/middleware中的文件实现路由保护功能

- /app/controller中的两个文件夹分别是给前后台的接口文件，给后台的接口功能具体写在在/app/controller/admin/main.js中，而接口名字则汇总在/app/router/admin.js中

  

前后台的/config文件夹中的apiUrl文件把这些接口的名字（就是一些http链接）复制过来，这样前后台只要引入

apiUrl就可以用axios远程获取接口的数据了