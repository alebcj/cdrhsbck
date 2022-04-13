/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

//Librerias
const express = require("express");
const { engine } = require("express-handlebars");
const Container = require("./Storage/Container");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
var moment = require("moment"); // require
const db = require("./db/db");
const { SQLiteConfig } = require("./cfg/sqlite");
const knex = require("knex")(SQLiteConfig);
const storage = require("node-persist");
storage.init({
  dir: "src/",

  stringify: JSON.stringify,

  parse: JSON.parse,

  encoding: "utf8",
});

//Instancias
const app = express();
const { routerProducts } = require("./Router/routerProducts");
const container = new Container("products.json");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//Config
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.initialize();

//Start
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//const server = app.listen(PORT, () => {
//  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`);
//});

app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.redirect("/productos");
});

var messages = [];
// El servidor funcionando en el puerto PORT
httpServer.listen(PORT, () =>
  console.log(` 🖥️  Server iniciado, escuchando... http://localhost:${PORT}`)
);

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  })
);

//Motor Templates HBS
app.set("view engine", "hbs");
//Path Templates HBS
app.set("views", "./views/layout");

app.get("/productos", async (req, res) => {
  const products = await container.getAll();
  res.render("layout", { products, messages });
});

app.post("/productos", async (req, res) => {
  const product = req.body;
  await container.save(product);
  res.redirect("/productos");
});

//Router api
app.use("/api/productos", routerProducts);

io.on("connection", async (socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
  console.log("Usuario conectado");
  messages = await knex.select().from("messages");
  io.sockets.emit("mensajeBack", messages);

  socket.on("mensajeFront", async (data) => {
    const messageParsed = {
      id: socket.id,
      mail: data.mail,
      msg: data.mensaje,
      date: moment().format("DD/MM/YYYY, HH:mm:ss"),
    };
    messages = await knex.select().from("messages");
    messages.push(messageParsed);
    await knex("messages").insert(messageParsed);
    io.sockets.emit("mensajeBack", messages);
  });
});
