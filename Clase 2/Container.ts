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
  getById(id: number): Promise<ProductType>;
  getAll(): Promise<ProductType[]>;
  deleteById(id: number): Promise<void>;
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

  async save(producto: ProductType): Promise<number> {
    await this.getAll();
    this.maxId++;
    producto.id = this.maxId;
    this.products.push(producto);
    try {
      await fs.writeFile(this.filename, JSON.stringify(this.products));
      return this.maxId;
    } catch (err: any) {
      console.log(
        `Error al agregar ${producto} en Archivo: ${this.filename}: ${err}`
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
        `Error al obtener elemento con índice "${id}" en Archivo: "${this.filename}" ERROR: ${err}`
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
  async deleteById(id: number): Promise<void> {
    try {
      const aux = await this.getAll();
      const x = aux.findIndex((obj) => obj.id == id);
      aux.splice(x, 1);
      await fs.writeFile(this.filename, JSON.stringify(aux));
      console.log(
        `Se eliminó Objeto de ID: "${id}" de Archivo: "${this.filename}"`
      );
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
