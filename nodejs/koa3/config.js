const config = {
  port: 3000,

  logPath: "./logs/",

  debug: true,

  routers: [
    "user.js",
  ],

  database: {
    test: {
      type: "mysql2",
      host: "localhost",
      user: "root",
      password: "password",
      database: "test",
      port: 3306,
    },

    minConnection: 3,
    maxConnection: 10,
  },
};

export default config;
