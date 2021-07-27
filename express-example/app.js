const app = require('express')();
const config = require('./config/config.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 未捕捉的Promise错误处理
 */
const DingTalkCustomRobot = require('./library/dingTalkCustomRobot.js');
const logger = require('./util/logger.js');
process.on('unhandledRejection', function(reason, promise) {
    console.error('unhandledRejection', new Date(), reason, promise);
    logger.getLogger('error').fatal('unhandledRejection', reason, promise);
    new DingTalkCustomRobot()
        .setContent('unhandledRejection Error\n' +`reason: ${reason.stack}\n`)
        .send();
});

/**
 * 全局的进程异常错误(只进行日志记录与消息推送,不阻止异常进程退出)
 * 不使用 uncaughtExceptionMonitor 事件
 * 此事件无法让钉钉消息推送完才退出进程
 */
process.on('uncaughtException', async (err, origin) => {
    console.log('uncaughtException', new Date(), err, origin);
    logger.getLogger('error').fatal('uncaughtException', err, origin);
    // 增加await 阻止进程退出过快导致log与钉钉通知没有执行完
    await new DingTalkCustomRobot()
        .setContent('uncaughtException Error\n' +`reason: ${err.stack}\n`)
        .send();
    // 不阻止进程退出 进程会在PM2层面重启
    process.exit(-1);
});

/**
 * 处理输入报文中间件
 */
app.use(require('./middleware/input.js'));

/**
 * 处理header中间件
 */
app.use(require('./middleware/header.js'));

/**
 * 记录请求时间中间件
 */
app.use(require('./middleware/requestTime.js'));

/**
 * 路由权限校验中间件
 */
app.use(require('./middleware/routePermission.js'));

/**
 * 加载路由
 */
const routes = config.routes;
for (const key in routes) {
    if (routes.hasOwnProperty(key)) {
        const element = routes[key];
        const route = require(element);
        app.use(route);
    }
}

/**
 * 记录请求日志中间件
 */
app.use(require('./middleware/requestLog.js'));

/**
 * 响应请求中间件
 */
app.use(require('./middleware/response.js'));

/**
 * 错误处理中间件
 */
app.use(require('./middleware/requestError.js'));

app.listen(config.port);