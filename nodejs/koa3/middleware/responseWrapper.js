const ResponseWrapper = {
  output({ status, message, data }) {
    const json = {};
    json.success = status >= 200 && status <= 299 ? true : false;
    if (message) json.message = message;
    if (data) json.data = data;
    this.body = JSON.stringify(json);
  },

  // 200 ~ 299
  ok(data) {
    this.output({ status: 200, data });
  },
  created(data) {
    this.output({ status: 201, data });
  },

  // 400 ~ 499
  badRequest(message) {
    this.output({ status: 400, message });
  },
  unauthorized(message) {
    this.output({ status: 401, message });
  },
  forbidden(message) {
    this.output({ status: 403, message });
  },
  notFound(message) {
    this.output({ status: 404, message });
  },

  // 500 ~
  serverError(message) {
    this.output({ status: 500, message });
  },
};

export default async (ctx, next) => {
  ctx.response = Object.assign(ctx.response, ResponseWrapper);
  await next();
};
