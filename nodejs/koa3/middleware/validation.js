export default (Schema) => {
  return async (ctx, next) => {
    const { value: input, error } = Schema.validate({ ...ctx.input, ...ctx.params }, ValidationOptions);
    if (error) {
      ctx.response.badRequest(error.message);
      return;
    }
    ctx.input = input;
    await next();
  }
}

export const ValidationOptions = {
  allowUnknown: true,
  stripUnknown: true,
}
