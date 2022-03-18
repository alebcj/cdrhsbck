/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//Librerias
const express = require("express");
const { engine } = require("express-handlebars");
const Container = require("./Storage/Container");

//Instancias
const app = express();
const {routerProducts} = require('./Router/routerProducts')
const container = new Container("products.json");

//Config
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

//Start
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = app.listen(PORT, () => {
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
});

//Motor Templates PUG
app.set("view engine", "pug")
//Path Templates PUG
app.set("views", "./views");


app.get('/productos', async (req, res) =>{
  const products = await container.getAll();
  res.render('productos', {products})
})

app.post('/productos', async (req, res) =>{
  const product = req.body;
  await container.save(product);
  res.redirect('/productos')
})

  
//Router api
app.use('/api/productos', routerProducts)




