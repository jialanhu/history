import { MqttError, MqttErrorDefines } from "./mqttError";
import { Client } from "aedes:client";
import * as buffer from "buffer";
import * as Buffer from "buffer";
import { ConnectPacket } from "packet";

/**
 * 收到连接包时触发
 * 用途:
 *   限制速率
 *   限制连接上限
 *   IP黑白名单
 * 错误触发 connectionError 事件
 */
export const mqttPreConnect = callbackify(
  (client: Client & { conn: { remoteAddress: string } }, packet: ConnectPacket) => {
    const ip = client.conn.remoteAddress;
    if (!ip.includes("192.168")) {
      throw new MqttError(MqttErrorDefines.IP_BLACKLIST, ip);
    }
    return true;
  }
);

/**
 * 错误触发 clientError 事件
 */
export const mqttAuthenticate = callbackify((client: Client, username: string, password: Buffer) => {
  if (username !== "root" || password.toString("ascii") !== "root") {
    throw new MqttError(MqttErrorDefines.BAD_USERNAME_OR_PASSWORD, username, password);
  }
  return true;
});

/**
 * 触发
 *   推送 LTW 消息到所有在线客户端
 *   客户端推送消息
 */
export function authorizePublish(client, packet, callback) {}

/**
 * 触发
 *   恢复订阅的 non-clean 会话
 *   新的客户端订阅行为
 */
export function authorizeSubscribe(client, subscription, callback) {}

/**
 * 触发
 *   在客户端重新连接后发送 retained 消息时
 *   将订阅的消息发送给客户端时
 */
export function authorizeForward(client, packet) {}
export function published(packet, client, callback) {}

function callbackify(func: (...args) => boolean) {
  return (...args) => {
    const callback = args[args.length - 1];
    if (typeof callback !== "function") throw new Error("callback not a function");
    try {
      callback(null, func(...args));
    } catch (e) {
      callback(e, false);
    }
  };
}
