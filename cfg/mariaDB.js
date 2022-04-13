const mariaDBConfig = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "appuser",
    password: "password",
    database: "ecommerce",
  },
  pool: { min: 0, max: 7 },
};

module.exports = {
  mariaDBConfig,
};
