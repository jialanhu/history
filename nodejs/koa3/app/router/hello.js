
import Router from "@koa/router";

const router = new Router();
import HelloController from "../controller/hello.js";

router.get("/v1/hello/koa3", HelloController.koa3);

export default new Router().use("/api", router.routes());
