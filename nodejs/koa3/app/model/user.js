import Base from './base.js';

class User extends Base {
  _TABLE = 't_user';

  constructor(dbName) {
    super(dbName);
  }
}

export default new User('test');
