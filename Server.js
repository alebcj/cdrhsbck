/* eslint-disable @typescript-eslint/no-var-requires */

//Librerias
const express = require("express");

//Instancias
const app = express();
const {routerProducts} = require('./Router/routerProducts')


//Config
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Start
const server = app.listen(PORT, () => {
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
});

//Methods
app.get("/", (req, res) => {
  res.send("Ok");
});
  
//Router
app.use('/api/productos', routerProducts)


