const log4js = require('log4js');
const config = require('./../config/config.js');
let logPath = config.log_path;

let categories = {
    default:{ appenders: [ 'default', 'stats' ], level: 'ALL'},
    error:{ appenders: [ 'error','stats'], level: 'ALL'},
    exception:{ appenders: [ 'exception','stats' ], level: 'ALL'},
    access:{ appenders: [ 'request' ], level: 'ALL'},
};

if (config.debug) {
    categories.default.appenders.push('console');
    categories.exception.appenders.push('console');
    categories.error.appenders.push('console');
}

log4js.configure({
    appenders: {
        console: {
            type: 'console'
        },

        //错误日志
        error: { 
            type: 'dateFile',
            // filename 以/进行分割的最后一个字段会作为文件名前缀连接pattern
            filename: logPath + 'error',
            pattern: 'yyyy-MM-dd.log',
            // 日志输出格式
            layout: { type: 'basic' },
            // 启用日志文件命名格式，需要配合type为dateFile进行使用
            alwaysIncludePattern: true
        },

        //系统日志
        default: { 
            type: 'dateFile',
            filename: logPath + 'default',
            pattern: 'yyyy-MM-dd.log',
            layout: { type: 'basic' },
            alwaysIncludePattern: true
        },
        
        //统计日志
        stats: { 
            type: 'dateFile',
            filename: logPath + 'stats',
            pattern: 'yyyy-MM-dd.log',
            layout: { type: 'basic' },
            alwaysIncludePattern: true
        },

        //异常日志
        exception: { 
            type: 'dateFile',
            filename: logPath + 'exception',
            pattern: 'yyyy-MM-dd.log',
            layout: { type: 'basic' },
            alwaysIncludePattern: true
        },

        //请求访问日志
        request: { 
            type: 'dateFile',
            filename: logPath + 'request',
            pattern: 'yyyy-MM-dd.log',
            layout: { type: 'basic' },
            alwaysIncludePattern: true
        },
    },

    categories: categories,

    pm2:true,
    disableClustering:true
});

module.exports = log4js;