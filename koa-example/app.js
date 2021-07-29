const Koa = require('koa');
const app = new Koa();
const config = require('./config/config.js');
const logger = require('./util/logger.js');

/**
 * 全局错误处理
 */
app.on('error', function(err, ctx) {
	console.error('appError', err);
	logger.getLogger('error').fatal('appError', err);
});

process.on('uncaughtException', function(err) {
	if (err) {
		console.error('uncaughtException', err.stack);
		logger.getLogger('error').fatal('uncaughtException', err.stack);
	}
});

process.on('unhandledRejection', function(reason, promise) {
	if (promise) {
		console.error('unhandledRejection', reason, promise);
		logger.getLogger('error').fatal('unhandledRejection', reason, promise);
	}
});

/**
 * 添加报文解析中间件
 */
const bodyParser = require('koa-bodyparser');
const xmlParser = require('koa-xml-body');
app.use(xmlParser());
app.use(bodyParser());

/**
 * 处理输入报文中间件
 */
app.use(require('./middleware/input.js'));

/**
 * 处理header中间件
 */
app.use(require('./middleware/header.js'));

/**
 * 请求回调处理中间件
 */
app.use(require('./middleware/requestError.js'));

/**
 * 加载路由
 * 路由配置在config/config.js中 routes 数组中
 */
let routes = config.routes;
for (let key in routes) {
    if (routes.hasOwnProperty(key)) {
        let element = routes[key];
        let router = require(element)();
        app.use(router.routes());
    }
}

app.listen(config.port);

module.exports = app;