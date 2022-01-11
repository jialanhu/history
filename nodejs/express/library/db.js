const dbConfig = require('./../config/db.js');
const Knex = require('knex');
const Ioredis = require('ioredis');
const logger = require('./../util/logger.js');

class DB {
    constructor() {
        try {
            this.redis = new Ioredis(dbConfig.redis);
            /**
             * redis监控日志
             */
            this.redis.on('connect', function () {
                logger.getLogger('default').trace('redis', '连接成功');
            });

            this.redis.on('error', function (err) {
                logger.getLogger('error').fatal('redis', '连接失败', err);
            });

            this.redis.on('reconnecting', function () {
                logger.getLogger('error').warn('redis', '尝试重新连接中');
            });

            this.mysql = new Knex({
                client: 'mysql',
                debug: dbConfig.mysql.debug,
                connection: {
                    host: dbConfig.mysql.host,
                    user: dbConfig.mysql.user,
                    password: dbConfig.mysql.password,
                    database: dbConfig.mysql.database,
                },
                pool: {
                    min: dbConfig.mysql.minConnection,
                    max: dbConfig.mysql.maxConnection
                },
            });

        } catch (e) {
            logger.getLogger('error').error("创建数据库链接错误", e.message);
        }

    }
}
module.exports = new DB();