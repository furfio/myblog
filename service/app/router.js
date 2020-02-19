'use strict';

/**
 * @param {Egg.Application} app - egg application
 * 总的路由,这里指向前台路由/router/default 以及后台路由/router/admin
 */
module.exports = app => {
    require('./router/default')(app)
};
