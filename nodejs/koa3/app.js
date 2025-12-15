import Koa from "koa";
import { withBodyParsers } from "@koa/body-parsers";
import config from "./config.js";
import Logger from "./util/logger.js";
import requestInput from "./middleware/requestInput.js";
import requestLog from "./middleware/requestLog.js";
import responseWrapper from "./middleware/responseWrapper.js";

const logger = new Logger("[app.js]");
const app = new Koa();
withBodyParsers(app);

process.on("uncaughtException", (err, origin) => {
  console.error("uncaughtException", err?.stack ?? err, origin);
  logger.error("uncaughtException", err?.stack ?? err, origin);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("unhandledRejection", reason, promise);
  logger.error("unhandledRejection", reason, promise);
});

app.on("error", (err) => {
  console.error("appError", err);
  logger.getLogger("error").fatal("appError", err);
});

app.use(requestInput);

app.use(responseWrapper);

app.use(requestLog);

config.routers.forEach(async element => {
  const { default: routerModule } = await import(`./app/router/${element}`);
  app.use(routerModule.routes());
});

app.listen(config.port, () => logger.info(`App listening on port ${config.port}!`));
