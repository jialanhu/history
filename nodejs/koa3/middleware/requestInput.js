export default async (ctx, next) => {
  const method = ctx.method;
  switch (method) {
    case "GET":
    case "DELETE":
      ctx.input = ctx.query;
      break;
    case "PUT":
    case "POST":
      ctx.input = await ctx.request.json();
      break;
    default:
      ctx.input = {};
      break;
  }
  ctx.type = "application/json; charset=utf-8";
  await next();
};
