var apm = require("elastic-apm-node").start({
  serviceName: "my-service-name",
  secretToken: "",
  serverUrl: "http://localhost:8200",
  environment: "my-environment",
});

const Koa = require("koa");
const app = new Koa();

const KoaRouter = require("koa-router");

const router = new KoaRouter();

router.post("/", (ctx, next) => (ctx.body = "hello post"));
router.put("/", (ctx, next) => (ctx.body = "hello put"));
router.get("/", (ctx, next) => (ctx.body = "hello get"));
router.del("/", (ctx, next) => (ctx.body = "hello del"));

app.use(router.routes());

app.listen(3000);
