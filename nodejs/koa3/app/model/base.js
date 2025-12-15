import DB from "../../util/db.js";

class Base {
  _db;
  constructor(dbName) {
    this._db = DB.get(dbName);
  }

  async insert(insertObj) {
    return await this._db(this._TABLE).insert(insertObj);
  }

  async del(where) {
    return await this._db(this._TABLE).where(where).del();
  }

  async update(updateField, where) {
    return await this._db.from(this._TABLE).update(updateField).where(where);
  }

  async findOne({ fields = "*", where = {} }) {
    return await this._db.select(fields).from(this._TABLE).where(where).first();
  }

  async findAll({ fields = "*", where = {}, offset, limit, order = [] }) {
    let query = this._db.select(fields).from(this._TABLE).where(where).offset(offset).limit(limit);
    order.forEach(([field, direction]) => {
      query = query.orderBy(field, direction);
    });
    return await query;
  }
}

export default Base;
