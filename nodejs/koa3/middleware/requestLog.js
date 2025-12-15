import { ApiError } from "../util/errors.js";
import Logger from "../util/logger.js";

const logger = new Logger("[RequestMiddleware]");

export default async (ctx, next) => {
  const beginTime = Date.now();
  const req = ctx.request;
  const ip = req.get("X-Real-IP") || req.get("X-Forwarded-For") || req.ip;
  const requestLog = {
    url: req.url,
    method: req.method,
    headers: ctx.headers,
    client_ip: ip,
    input: ctx.input,
  };
  try {
    await next();
    const res = ctx.response;
    const endTime = Date.now();
    Object.assign(requestLog, {
      status: res.status,
      cost: endTime - beginTime,
    });

    logger.getLogger("request").trace("requestSuccess", requestLog);
  } catch (e) {
    if (e instanceof ApiError) {
      logger.warn("error.stack", e.stack);
    } else {
      logger.error("error.stack", e.stack);
    }

    const status = e.status || 500;
    const msg = e.message || e;
    const endTime = Date.now();

    Object.assign(requestLog, {
      status,
      msg: msg,
      cost: endTime - beginTime,
    });

    ctx.status = status;

    if (status === 500) {
      logger.getLogger("request").error("requestError", requestLog);
    } else {
      logger.getLogger("request").warn("requestException", requestLog);
    }

    ctx.response.output({ status, message: msg });
  }
};
