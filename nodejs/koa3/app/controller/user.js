import UserService from "../service/user.js";

class UserController {
  async create(ctx) {
    await UserService.create(ctx.input);
    const user = await UserService.get({ username: ctx.input.username });
    delete user.password;
    delete user.salt;
    ctx.response.created(user);
  }

  async get(ctx) {
    const user = await UserService.get({ id: ctx.input.id });
    delete user.password;
    delete user.salt;
    ctx.response.ok(user);
  }

  async update(ctx) {
    await UserService.update(ctx.input);
    const user = await UserService.get({ id: ctx.input.id });
    delete user.password;
    delete user.salt;
    ctx.response.ok(user);
  }

  async delete(ctx) {
    await UserService.delete({ id: ctx.input.id });
    ctx.response.ok();
  }

  async list(ctx) {
    const users = await UserService.list(ctx.input);
    users.forEach(user => {
      delete user.password;
      delete user.salt;
    });
    ctx.response.ok(users);
  }
}

export default new UserController();

