//Librerias
const express = require("express");
const Container = require("../Clase 2/Container");
//Instancias
const container = new Container("products.json");

//Utils
function getRandomInt(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Config
const app = express();
const PORT = 8080;
//Start
const server = app.listen(PORT, () => {
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
});


//Responses
app.get("/", (req, res) => {
  res.send("Ok");
});

app.get("/productos", async (req, res) => {
  const products = await container.getAll();
  res.send(products);
});

app.get('/productoRandom', async (req, res) => {
  const products = await container.getAll();   
  res.send(await container.getById(getRandomInt(1, products.length))); 
})


