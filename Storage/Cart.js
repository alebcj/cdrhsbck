import * as fs from 'fs';
const fsp = fs.promises;
/* ------------------------------- typescript ------------------------------- */

class Cart {
  cartsList;
  maxId;
  filename;

  constructor(filename) {
    this.cartsList = [];
    this.maxId = 0;
    this.filename = `${filename}`;
  }

  async saveCart(cart) {
    await this.getAllCarts();
    this.maxId++;
    cart.id = this.maxId;
    cart.createDate = Date.now();
    this.cartsList.push(cart);
    try {
      await fsp.writeFile(this.filename, JSON.stringify(this.cartsList));
      return this.maxId;
    } catch (err) {
      console.log(
        `Error al agregar ${cart} en Archivo: ${this.filename}: ${err}`,
      );
      throw new Error(err);
    }
  }

  async updateCart(cart) {
    try {
      await this.getAllCarts();
      const cartOld = await this.getCartById(cart.id);
      if (cartOld != null) {
        cartOld.title = cart.title;
        cartOld.price = cart.price;
        cartOld.thumbnail = cart.thumbnail;
        cartOld.lastUpdateDate = Date.now();
        await fsp.writeFile(this.filename, JSON.stringify(this.cartsList));
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al actualizar ${cart} en Archivo: ${this.filename}: ${err}`,
      );
      throw new Error(err);
    }
  }

  async getCartById(id) {
    try {
      const aux = await this.getAllCarts();
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento con índice "${id}" no existe en Archivo: "${this.filename}" ERROR: ${err}`,
      );
    }
  }

  async getRandomCart() {
    try {
      const aux = await this.getAllCarts();
      const id = Math.floor(Math.random() * (this.maxId - 1)) + 1;
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento Random en Archivo: "${this.filename}" ERROR: ${err}`,
      );
    }
  }

  async getAllCarts() {
    try {
      if (!fs.existsSync(this.filename)) {
        await fsp.writeFile(this.filename, JSON.stringify([]));
      } else {
        const carts = JSON.parse(await fsp.readFile(this.filename, 'utf-8'));
        this.cartsList = carts;
        if (this.cartsList.length > 0) {
          this.cartsList.map((cart) => {
            if (cart.id && this.maxId < cart.id) this.maxId = cart.id;
          });
        }
      }
      return this.cartsList;
    } catch (err) {
      console.log(
        `Error al obtener carritos de Archivo: "${this.filename}" ERROR: ${err}`,
      );
      throw new Error(err);
    }
  }

  async deleteCart(id) {
    try {
      const aux = await this.getAllCarts();
      const x = aux.findIndex((obj) => obj.id == id);
      if (x != -1) {
        aux.splice(x, 1);
        await fsp.writeFile(this.filename, JSON.stringify(aux));
        console.log(
          `Se eliminó Carrito de ID: "${id}" de Archivo: "${this.filename}"`,
        );
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(
        `Error al eliminar carrito de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`,
      );
      throw new Error(err);
    }
  }

  async deleteAllCarts() {
    this.cartsList = [];
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

export { Cart as Cart };
