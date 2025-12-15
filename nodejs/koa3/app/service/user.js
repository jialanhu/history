import dateUtils from "../../util/dateUtils.js";
import userModel from "../model/user.js";
import encryptUtils from "../../util/encrypt.js";
import utils from "../../util/utils.js";
import { ConflictError } from "../../util/errors.js";

class UserService {
  async create({ username, password, nickname }) {
    if (await userModel.findOne({ fields: ["id"], where: { username } })) {
      throw new ConflictError("Username already exists");
    }
    const salt = utils.genUUID();
    const hashPassword = encryptUtils.hmacSha256(password, salt);
    await userModel.insert({ username, password: hashPassword, salt, nickname, created_at: dateUtils.getUnix() });
  }

  async get(where) {
    const user = await userModel.findOne({ where });
    return user;
  }

  async update({ id, password, nickname }) {
    const updateData = {};
    if (password) {
      const salt = utils.genUUID();
      const hashPassword = encryptUtils.hmacSha256(password, salt);
      updateData.password = hashPassword;
      updateData.salt = salt;
    }
    if (nickname) {
      updateData.nickname = nickname;
    }
    if (Object.keys(updateData).length === 0) {
      return;
    }
    await userModel.update(updateData, { id });
  }

  async delete({ id }) {
    await userModel.del({ id });
  }

  async list({ offset, limit, where = {}, order = [] }) {
    const users = await userModel.findAll({ offset, limit, where, order });
    return users;
  }
}

export default new UserService();
