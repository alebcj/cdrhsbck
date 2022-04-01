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
  const cart = req.body;
  var id = await carts.save(cart);
  res.send(await carts.getById(id));
});

rtrCart.delete('/:id', async (req, res) => {
  const del = carts.deleteCart(req.params.id);
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
  const cart = carts.getCartById(req.params.id);
  if (cart != null) {
    res.send(cart.products);
  } else {
    res.send(ERR_NOT_FOUND);
  }
});

export { rtrCart as rtrCart };
