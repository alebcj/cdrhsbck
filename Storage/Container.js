import * as fs from 'fs';
const fsp = fs.promises;
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
    this.products.push(product);
    try {
      await fsp.writeFile(this.filename, JSON.stringify(this.products));
      return this.maxId;
    } catch (err) {
      console.log(
        `Error al agregar ${product} en Archivo: ${this.filename}: ${err}`,
      );
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
        await fsp.writeFile(this.filename, JSON.stringify(this.products));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al actualizar ${product} en Archivo: ${this.filename}: ${err}`,
      );
      throw new Error(err);
    }
  }

  async getById(id) {
    try {
      const aux = await this.getAll();
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento con índice "${id}" no existe en Archivo: "${this.filename}" ERROR: ${err}`,
      );
    }
  }
  async getRandom() {
    try {
      const aux = await this.getAll();
      const id = Math.floor(Math.random() * (this.maxId - 1)) + 1;
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento Random en Archivo: "${this.filename}" ERROR: ${err}`,
      );
    }
  }
  async getAll() {
    try {
      if (!fs.existsSync(this.filename)) {
        await fsp.writeFile(this.filename, JSON.stringify([]));
      } else {
        const productos = JSON.parse(
          await fsp.readFile(this.filename, 'utf-8'),
        );
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
      console.log(
        `Error al obtener productos de Archivo: "${this.filename}" ERROR: ${err}`,
      );
      throw new Error(err);
    }
  }
  async deleteById(id) {
    try {
      const aux = await this.getAll();
      const x = aux.findIndex((obj) => obj.id == id);
      if (x != -1) {
        aux.splice(x, 1);
        await fsp.writeFile(this.filename, JSON.stringify(aux));
        console.log(
          `Se eliminó Objeto de ID: "${id}" de Archivo: "${this.filename}"`,
        );
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al eliminar producto de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`,
      );
      throw new Error(err);
    }
  }

  async deleteAll() {
    this.products = [];
    try {
      await fsp.writeFile(this.filename, JSON.stringify([]));
      console.log(`Se eliminó el Archivo: "${this.filename}"`);
    } catch (err) {
      console.log(
        `Error al eliminar el Archivo: "${this.filename}" Error: ${err}`,
      );
      throw new Error(err);
    }
  }
}

export { Container as Container };
