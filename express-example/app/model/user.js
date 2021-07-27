const Base = require('./base.js');
const db = require('../../library/db.js');

class User extends Base {
    constructor() {
        super();
        this.mysql = db.mysql;

        this._TABLE = 't_user';
    }
}

module.exports = new User();