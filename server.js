/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Librerias
import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
dotenv.config();

//Instancias
const app = express();
import { rtrProducts } from './Router/rtrProducts.js';
import { rtrCart } from './Router/rtrCart.js';

//Config
app.use(json());
app.use(urlencoded({ extended: true }));

//Start
const server = app.listen(process.env.PORT, () => {
  console.log(
    ` 🖥️  Server iniciado, escuchando... http://localhost:${process.env.PORT}`,
  );
});

//Router
app.use('/api/productos', rtrProducts);
app.use('/api/carrito', rtrCart);
