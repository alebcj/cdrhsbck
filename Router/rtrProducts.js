/* eslint-disable no-undef */

//Librerias
import express from 'express';
import { Container } from '../Storage/Container.js';
const { Router } = express;
import dotenv from 'dotenv';

//Instancias
const container = new Container('./src/products.json');
const rtrProducts = Router();
dotenv.config();

//Utils
const ERR_NOT_FOUND = { error: '404', descripcion: 'producto no encontrado' };
const isAdmin = process.env.isAdmin == '1';
const ERR_401_UNAUTHORIZED = { error: '401', descripcion: 'no autorizada' };

//Methods
rtrProducts.get('/random', async (req, res) => {
  const products = await container.getRandom();
  res.send(products);
});

rtrProducts.get('/', async (req, res) => {
  const products = await container.getAll();
  res.send(products);
});

rtrProducts.get('/:id', async (req, res) => {
  const products = await container.getById(req.params.id);
  if (products != null) {
    res.send(products);
  } else {
    res.send(ERR_NOT_FOUND);
  }
});

rtrProducts.post('/', async (req, res) => {
  if (isAdmin) {
    const product = req.body;
    var id = await container.save(product);
    res.send(await container.getById(id));
  } else {
    res.send(ERR_401_UNAUTHORIZED);
  }
});

rtrProducts.put('/:id', async (req, res) => {
  if (isAdmin) {
    const product = req.body;
    product.id = req.params.id;
    const update = await container.update(product);
    if (update == true) {
      res.send('Producto actualizado correctamente');
    } else {
      res.send(ERR_NOT_FOUND);
    }
  } else {
    res.send(ERR_401_UNAUTHORIZED);
  }
});

rtrProducts.delete('/:id', async (req, res) => {
  if (isAdmin) {
    const del = await container.deleteById(req.params.id);
    if (del == true) {
      res.send(
        `El producto de ID:${req.params.id} ha sido eliminado correctamente.`,
      );
    } else {
      res.send(ERR_NOT_FOUND);
    }
  } else {
    res.send(ERR_401_UNAUTHORIZED);
  }
});

const _routerProducts = rtrProducts;
export { _routerProducts as rtrProducts };
