/*

Manejo de archivos
Formato: carpeta comprimida con el proyecto. 
 

>> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.


 Formato: carpeta comprimida con el proyecto. 
Sugerencia: usar un archivo para la clase y otro de test, que la importe
 
>> Aspectos a incluir en el entregable: 
-El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
-Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
-Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
-Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
-Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
-El formato de cada producto será : 

{
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url de la foto del producto)
}


*/


// Testing

const Contenedor = require("./Contenedor");

(async function(){
  //...

  console.log(
    "\n",
    "-----------------------------",
    "\n",
    "Ejercicio Entregable - Clase 2",
    "\n",
    "-----------------------------",
    "\n"
  );

  //Creo algunos objetos
  const objRule = {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  };

  const objCalculator = {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
  };

  const objEarth = {
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
  };

  //Instanciamos Contenedor
  const container = new Contenedor("productos.txt");

  //Guardamos algunos objetos
  console.log("\n", "***TEST LOG***: Guardamos objetos");
  console.log(await container.save(objEarth))
  console.log(await container.save(objRule))
  console.log(await container.save(objCalculator))
  console.log(await container.save(objEarth))
  console.log(await container.save(objRule))
  console.log(await container.save(objEarth))
  console.log(await container.save(objCalculator))
  console.log(await container.save(objRule))

  //Obtenemos todos los objetos
  console.log("\n", "***TEST LOG***: Obtenemos todos los objetos");
  var x = await container.getAll();
  console.log(x);

  //Buscamos por algún ID en específico y mostramos.
  console.log(
    "\n",
    "***TEST LOG***: Buscamos por algún ID en específico y mostramos."
  );
  x = await container.getById(7);
  console.log(`Producto recuperado: "${JSON.stringify(x)}"`);

  //Eliminamos el anteriormente buscado
  console.log("\n", "***TEST LOG***: Eliminamos el anteriormente buscado");
  await container.deleteById(7);

  //Volvemos a buscarlo
  console.log("\n", "***TEST LOG***: Volvemos a buscarlo");
  x = await container.getById(7);
  console.log(`Producto recuperado: "${JSON.stringify(x)}"`);

  //Eliminamos archivo
  console.log("\n", "***TEST LOG***: Eliminamos el archivo");
  await container.deleteAll();

  //Firma
  console.log(
    "\n",
    "-----------------------------",
    "\n",
    "Ejercicio realizado por: Alejandro Zammi - Coderhouse - Comisión 28855",
    "\n",
    "-----------------------------"
  );


})(); 
