//Librerias
import express from 'express';
import { Cart } from '../Storage/Cart.js';
const { Router } = express;

//Instancias
const carts = new Cart('./src/carts.json');
const rtrCart = Router();

//Utils
const ERR_NOT_FOUND = { error: 'carrito no encontrado' };

//Methods
rtrCart.post('/', async (req, res) => {
  var id = await carts.saveCart();
  res.send(await carts.getCartById(id));
});

rtrCart.get('/', async (req, res) => {
  res.send(await carts.getAllCarts());
});

rtrCart.delete('/:id', async (req, res) => {
  const del = await carts.deleteCart(req.params.id);
  if (del == true) {
    res.send(
      `El carrito de ID:${req.params.id} ha sido eliminado correctamente.`,
    );
  } else {
    res.send(ERR_NOT_FOUND);
  }
});

//GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
rtrCart.get('/:id/productos', async (req, res) => {
  const cart = await carts.getCartById(req.params.id);
  if (cart != null) {
    res.send(cart.products);
  } else {
    res.send(ERR_NOT_FOUND);
  }
});

//POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
rtrCart.post('/:id/productos', async (req, res) => {
  const idCart = req.params.id;
  const product = req.body;
  const save = await carts.saveProductToCart(idCart, product);
  if (save == true) {
    res.send(
      `Se agregó correctamente ProductoID: ${product.id} en carrito Id ${idCart}.`,
    );
  } else {
    res.send(`No se pudo agregar ${product} en carrito Id ${idCart}.`);
  }
});

//DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
rtrCart.delete('/:id/productos/:id_prod', async (req, res) => {
  const del = await carts.deleteProductFromCart(
    req.params.id,
    req.params.id_prod,
  );
  if (del == true) {
    res.send(
      `Se eliminó correctamente Producto ID: ${req.params.id_prod} en carrito Id: ${req.params.id}.`,
    );
  } else {
    res.send(
      `Error al eliminar producto ID: ${req.params.id_prod} en carrito Id: ${req.params.id}.`,
    );
  }
});

export { rtrCart as rtrCart };
