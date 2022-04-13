const fs = require("fs");
const fsp = fs.promises;

const { mariaDBConfig } = require("../cfg/mariaDB");
const knex = require("knex")(mariaDBConfig);

/* ------------------------------- typescript ------------------------------- */

class Container {
  products;
  maxId;
  filename;

  constructor(nombreArchivo) {
    this.products = [];
    this.maxId = 0;
    this.filename = `${nombreArchivo}`;
  }

  async save(product) {
    await this.getAll();
    this.maxId++;
    product.id = this.maxId;
    product.createDate = Date.now();
    this.products.push(product);
    try {
      await knex("products").insert(product);
      return this.maxId;
    } catch (err) {
      console.log(`Error al agregar ${product} en BD: ${err}`);
      throw new Error(err);
    }
  }

  async update(product) {
    try {
      await this.getAll();
      const productOld = await this.getById(product.id);
      if (productOld != null) {
        productOld.title = product.title;
        productOld.price = product.price;
        productOld.thumbnail = product.thumbnail;
        productOld.lastUpdateDate = Date.now();
        await knex.from("producto").where("id", product.id).update(productOld);
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al actualizar ${product} en Archivo: BD. ERROR: ${err}`
      );
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      return (
        (await knex.from("products").select().where("id", "=", id)) || null
      );
    } catch (err) {
      console.log(
        `Error al obtener elemento con índice "${id}" no existe en Archivo: "${this.filename}" ERROR: ${err}`
      );
    }
  }
  async getRandom() {
    try {
      const id = Math.floor(Math.random() * (this.maxId - 1)) + 1;
      return (
        (await knex.from("products").select().where("id", "=", id)) || null
      );
    } catch (err) {
      console.log(
        `Error al obtener elemento Random en Archivo: "${this.filename}" ERROR: ${err}`
      );
    }
  }
  async getAll() {
    try {
      if (!fs.existsSync(this.filename)) {
        await fsp.writeFile(this.filename, JSON.stringify([]));
      } else {
        const productos = await knex.select().from("products");
        this.products = productos;
        if (this.products.length > 0) {
          this.products.map((producto) => {
            if (producto.id && this.maxId < producto.id)
              this.maxId = producto.id;
          });
        }
      }
      return this.products;
    } catch (err) {
      console.log(`Error al obtener productos de BD.  ERROR: ${err}`);
      throw new Error(err);
    }
  }
  async deleteById(id) {
    try {
      if ((await knex.from("products").where("id", "=", id).del()) == 1) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al eliminar producto de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`
      );
      throw new Error(err);
    }
  }
}

module.exports = Container;
