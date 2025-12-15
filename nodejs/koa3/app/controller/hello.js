class HelloController {
  async koa3(ctx) {
    ctx.response.ok({ msg: "Hello, Koa 3!" });
  }
}

export default new HelloController();

