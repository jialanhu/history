import Knex from 'knex';
import config from '../config.js';

class DB {
  #mysqlMap = new Map();

  constructor() { }

  get(dbName) {
    if (!config?.["database"]?.[dbName]) {
      throw new Error(`Database configuration for ${dbName} not found`);
    }
    const dbConfig = config["database"][dbName];
    if (!this.#mysqlMap.has(dbName)) {
      const knex = Knex({
        client: dbConfig.type,
        connection: {
          host: dbConfig.host,
          port: dbConfig.port,
          user: dbConfig.user,
          password: dbConfig.password,
          database: dbName,
        },
        pool: {
          min: dbConfig.minConnection ?? config["database"].minConnection,
          max: dbConfig.maxConnection ?? config["database"].maxConnection
        },
      });
      this.#mysqlMap.set(dbName, knex);
    }
    return this.#mysqlMap.get(dbName);
  }

}
export default new DB();
