import import_fs = require("fs");
const fs = import_fs.promises;
/* ------------------------------- typescript ------------------------------- */

type ProductType = {
  id?: number;
  title: string;
  price: number;
  thumbnail: string;
};
/* ------------------------------- typescript ------------------------------- */
interface ContenedorType {
  products: ProductType[];
  maxId: number;
  filename: string;
  save(product: ProductType): Promise<number>;
  update(product: ProductType): Promise<boolean>;
  getById(id: number): Promise<ProductType>;
  getRandom(): Promise<ProductType>;
  getAll(): Promise<ProductType[]>;
  deleteById(id: number): Promise<boolean>;
  deleteAll(): Promise<void>;
}

class Contenedor implements ContenedorType {
  products: ProductType[];
  maxId: number;
  filename: string;

  constructor(nombreArchivo: string) {
    this.products = [];
    this.maxId = 0;
    this.filename = `./src/${nombreArchivo}`;
  }

  async save(product: ProductType): Promise<number> {
    await this.getAll();
    this.maxId++;
    product.id = this.maxId;
    this.products.push(product);
    try {
      await fs.writeFile(this.filename, JSON.stringify(this.products));
      return this.maxId;
    } catch (err: any) {
      console.log(
        `Error al agregar ${product} en Archivo: ${this.filename}: ${err}`
      );
      throw new Error(err);
    }
  }

  async update(product: ProductType): Promise<boolean> {
    try {
      await this.getAll();
      const productOld = await this.getById(product.id)
      if(productOld != null) {
        productOld.title = product.title;
        productOld.price = product.price;
        productOld.thumbnail = product.thumbnail;
        await fs.writeFile(this.filename, JSON.stringify(this.products));
        return true
      }
      else{
        return false;
      }
    } catch (err: any) {
      console.log(
        `Error al actualizar ${product} en Archivo: ${this.filename}: ${err}`
      );
      throw new Error(err);
    }
  }

  async getById(id: number): Promise<ProductType> {
    try {
      const aux = await this.getAll();
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento con índice "${id}" no existe en Archivo: "${this.filename}" ERROR: ${err}`
      );
    }
  }
  async getRandom(): Promise<ProductType> {
    try {
      const aux = await this.getAll();
      const id = Math.floor(Math.random() * (this.maxId - 1)) + 1;
      console.log(id);
      return aux.find((obj) => obj.id == id) || null;
    } catch (err) {
      console.log(
        `Error al obtener elemento Random en Archivo: "${this.filename}" ERROR: ${err}`
      );
    }
  }
  async getAll(): Promise<ProductType[]> {
    try {
      if (!import_fs.existsSync(this.filename)) {
        await fs.writeFile(this.filename, JSON.stringify([]));
      } else {
        const productos: ProductType[] = JSON.parse(
          await fs.readFile(this.filename, "utf-8")
        );
        this.products = productos;
        if (this.products.length > 0) {
          
          this.products.map((producto: ProductType) => {
            if (producto.id && this.maxId < producto.id)
              this.maxId = producto.id;
          });
        }
      }
      return this.products;
    } catch (err: any) {
      console.log(
        `Error al obtener productos de Archivo: "${this.filename}" ERROR: ${err}`
      );
      throw new Error(err);
    }
  }
  async deleteById(id: number): Promise<boolean> {
    try {
      const aux = await this.getAll();
      const x = aux.findIndex((obj) => obj.id == id);
      if(x != -1){
        aux.splice(x, 1);
        await fs.writeFile(this.filename, JSON.stringify(aux));
        console.log(
          `Se eliminó Objeto de ID: "${id}" de Archivo: "${this.filename}"`
        );
        return true;
      }
      else{
        return false;
      }

    } catch (err: any) {
      console.log(
        `Error al eliminar producto de ID: "${id}" en Archivo: "${this.filename}" Error: ${err}`
      );
      throw new Error(err);
    }
  }

  async deleteAll(): Promise<void> {
    this.products = [];
    try {
      await fs.writeFile(this.filename, JSON.stringify([]));
      console.log(`Se eliminó el Archivo: "${this.filename}"`);
    } catch (err: any) {
      console.log(
        `Error al eliminar el Archivo: "${this.filename}" Error: ${err}`
      );
      throw new Error(err);
    }
  }
}

module.exports = Contenedor;
