/* eslint-disable @typescript-eslint/no-var-requires */

//Librerias
const express = require("express");
const Container = require("./Storage/Container");
const { Router } = express;


//Instancias
const container = new Container("products.json");
const app = express();
const routerProducts = Router();


//Config
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//ERR CODES
const ERR_NOT_FOUND = { error : 'producto no encontrado' };


//Start
const server = app.listen(PORT, () => {
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
});


//Methods
app.get("/", (req, res) => {
  res.send("Ok");
});

routerProducts.get("/", async (req, res) => {
  const products = await container.getAll();
  res.send(products);
});

routerProducts.get("/:id", async (req, res) => {
  const products = await container.getById(req.params.id);
  if(products != null){
    res.send(products);
  }
  else{
    res.send(ERR_NOT_FOUND);
  }
  
});

routerProducts.get("/random", async (req, res) => {
  const products = await container.getRandom();
  res.send(products);
})

routerProducts.post("/", async (req, res) => {
  const product = req.body;
  var id = await container.save(product);
  res.send(await container.getById(id));
})

routerProducts.put('/:id', async (req,res) =>{
  const product = req.body;
  const update = await container.update(product);
  if(update == true){
    res.send("Producto actualizado correctamente")
  }
  else{
    res.send(ERR_NOT_FOUND)
  }
})

routerProducts.delete("/:id", async (req,res) => {
  const del = await container.deleteById(req.params.id);
  if (del == true){
    res.send(`El producto de ID:${req.params.id} ha sido eliminado correctamente.`)
  }
  else{
    res.send(ERR_NOT_FOUND)
  }
})
  
//Router
app.use('/api/productos', routerProducts)

