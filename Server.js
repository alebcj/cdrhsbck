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

//Start
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const server = app.listen(PORT, () => {
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
});

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  }),
);

//Motor Templates HBS
app.set("view engine", "hbs")
//Path Templates HBS
app.set("views", "./views/layout");


app.get('/productos', async (req, res) =>{
  const products = await container.getAll();
  res.render('layout', {products})
})

app.post('/productos', async (req, res) =>{
  const product = req.body;
  await container.save(product);
  res.redirect('/productos')
})

  
//Router api
app.use('/api/productos', routerProducts)




