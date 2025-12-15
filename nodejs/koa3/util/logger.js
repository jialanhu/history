import log4js from "log4js";
import config from "../config.js";

const appenders = {
  console: { type: "console" },
  default: {
    type: "dateFile",
    filename: config.logPath + "default",
    pattern: "yyyy-MM-dd.log",
    layout: { type: "basic" },
    alwaysIncludePattern: true,
  },

  error: {
    type: "dateFile",
    filename: config.logPath + "error",
    pattern: "yyyy-MM-dd.log",
    layout: { type: "basic" },
    alwaysIncludePattern: true,
  },

  exception: {
    type: "dateFile",
    filename: config.logPath + "exception",
    pattern: "yyyy-MM-dd.log",
    layout: { type: "basic" },
    alwaysIncludePattern: true,
  },

  request: {
    type: "dateFile",
    filename: config.logPath + "request",
    pattern: "yyyy-MM-dd.log",
    layout: { type: "basic" },
    alwaysIncludePattern: true,
  },
};

const categories = {
  default: { appenders: ["default"], level: "ALL" },
  error: { appenders: ["error"], level: "ALL" },
  exception: { appenders: ["exception"], level: "ALL" },
  request: { appenders: ["request"], level: "ALL" },
};

if (config.debug) {
  Object.values(categories).forEach(category => category.appenders.push("console"));
}

log4js.configure({
  appenders,
  categories,
  pm2: true,
  pm2InstanceVar: true,
  disableClustering: true,
});

class Logger {
  topic = "";
  constructor(topic) {
    this.topic = topic;
  }

  getLogger(category) {
    return log4js.getLogger(category);
  }

  trace(...args) {
    log4js.getLogger("default").trace(this.topic, ...args);
  }

  debug(...args) {
    log4js.getLogger("default").debug(this.topic, ...args);
  }

  info(...args) {
    log4js.getLogger("default").info(this.topic, ...args);
  }

  warn(...args) {
    log4js.getLogger("exception").warn(this.topic, ...args);
  }

  error(...args) {
    log4js.getLogger("error").error(this.topic, ...args);
  }

  fatal(...args) {
    log4js.getLogger("error").fatal(this.topic, ...args);
  }

  off(...args) {
    log4js.getLogger("error").off(this.topic, ...args);
  }
}

export default Logger;
