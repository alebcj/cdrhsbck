const { mariaDBConfig } = require("../cfg/mariaDB");
const { SQLiteConfig } = require("../cfg/sqlite");

const initialize = async () => {
  const knex = require("knex")(mariaDBConfig);
  console.log("Conexión a MariaDB con éxito!");

  // Crear tabla de Productos
  if (!(await knex.schema.hasTable("products"))) {
    knex.schema
      .createTable("products", (table) => {
        table.string("id");
        table.string("title");
        table.string("price");
        table.string("thumbnail");
        table.string("createdate");
      })
      .then(() => {
        console.log("Tabla Products creada con éxito");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knex.destroy();
      });
  }

  const knexLite = require("knex")(SQLiteConfig);
  console.log("Conexión a SQLite con éxito!");

  if (!(await knexLite.schema.hasTable("messages"))) {
    knexLite.schema
      .createTable("messages", (table) => {
        table.string("id");
        table.string("mail");
        table.string("msg");
        table.string("date");
      })
      .then(() => {
        console.log("Tabla messages creada con éxito");
      })
      .catch((err) => {
        console.log(err);
        throw err;
      })
      .finally(() => {
        knexLite.destroy();
      });
  }
};

module.exports = {
  initialize,
};
