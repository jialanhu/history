/**
 * 钉钉自定义机器人发送信息
 * @author jialan
 * @time 2021/04/01
 * 使用前先把机器地址放入白名单
 */

const HttpClient = require('./httpClient.js');
const postUrl = 'https://oapi.dingtalk.com/robot/send';
const config = require('./../config/config.js');
const defaultAccessToken = config.ding.access_token;
// 是否启动机器人消息推送
const status = config.ding.status;
const redis = require('./../library/db.js').redis;
const encrypt = require('./../library/encrypt.js');
const keyDefines = require('./keyDefines.js');

class DingCustomRobot {
    constructor(accessToken) {
        this.msgType = 'text';
        this.accessToken = accessToken || defaultAccessToken;
        return this;
    }

    setMsgType(msgType) {
        this.msgType = msgType;
        return this;
    }

    // 设置被@人的手机号，数组 eg: ["180XXXX1234"]
    setAtMobiles(atMobiles) {
        this.atMobiles = atMobiles;
        return this;
    }

    // @所有人时:true,否则为:false
    setIsAtAll(isAtAll) {
        this.isAtAll = isAtAll || false;
        return this;
    }

    // msgtype 为 text 时 发送的内容
    setContent(content) {
        this.content = content;
        return this;
    }

    // 防止时间内的重复消息发送
    async _isRepeated() {
        const md5 = encrypt.md5(JSON.stringify({
            msgType: this.msgType,
            accessToken: this.accessToken,
            content: this.content,
            atMobiles: this.atMobiles || '',
            isAtAll: this.isAtAll || '',
        }));
        return await redis.set(
            keyDefines.dingTalkCustomRobotMessageMd5RedisKey(md5),
            1, "NX", "EX", keyDefines.DING_TALK_ROBOT_REPEATED_CD);

    }

    async send() {
        if (!this.accessToken) {
            return "没有配置钉钉自定义机器人的AccessToken"
        }
        if (!status) {
            return;
        }
        let body = {};
        switch (this.msgType) {
            case 'text':
                body.msgtype = 'text';
                body.text = {
                    content: `ENV: ${config.env}\n` + this.content
                };
                break;
            default:
                return;
        }
        body.at = {};
        if (this.atMobiles) {
            body.at.atMobiles = this.atMobiles;
        }
        body.at.isAtAll = this.isAtAll || false;
        if (!await this._isRepeated()) return;
        return await new HttpClient()
            .post(postUrl, body)
            .setQuery({access_token: this.accessToken})
            .go();
    }
}


module.exports = DingCustomRobot;