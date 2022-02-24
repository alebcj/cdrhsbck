/*
Consigna:


1) Declarar una clase Usuario


2) Hacer que Usuario cuente con los siguientes atributos:
● nombre: String
● apellido: String
● libros: Object[]
● mascotas: String[]
Los valores de los atributos se deberán cargar a través del constructor, al momento de crear
las instancias.


3) Hacer que Usuario cuente con los siguientes métodos:
● getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
● addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de
mascotas.
● countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
● addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y
debe agregar un objeto: { nombre: String, autor: String } al array de libros.
● getBookNames(): String[]. Retorna un array con sólo los nombres del array de
libros del usuario.


4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.



Ejemplos:
● countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato']
usuario.countMascotas() debería devolver 2.
● getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las
moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}]
usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].
● getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk'
usuario.getFullName() deberia devolver 'Elon Musk'

*/

class Usuario {
    constructor(nombre, apellido) {   //Constructor de la clase
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`    //Utilizo Template Strings
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);                //Push al array de mascotas
    }

    countMascotas(){
        return this.mascotas.length;                //Devuelvo propiedad length del array de mascotas.
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});       //Creo obj en tiempo real y hago un push en el array de libros.
    }

    getBookNames() {
        return this.libros.map(book => book.nombre);            //Mapeo el array de libros, solamente con la propiedad de nombre y lo devuelvo.
    }

}

console.log('\n' , '-----------------------------', '\n', 'Ejercicio Entregable - Clase 1', '\n', '-----------------------------', '\n')

//Instanciamos un usuario.
const user = new Usuario("Pepe","Rodriguez",[],[]); 

//Obtenemos su nombre por consola con el método creado.
console.log(user.getFullName());

//Agregamos algunas mascotas al obj user.
user.addMascota("Dogo Argentino");
user.addMascota("Hámster");
user.addMascota("Bulldog Francés");
user.addMascota("Gato Siamés");

//Contabilizamos las mascotas.
console.log(user.countMascotas());

//Agregamos Libros al obj user.
user.addBook("La divina comedia", "Dante Alighieri");
user.addBook("El Señor de los Anillos", "J.R.R. Tolkien");
user.addBook("Computer Networks", "Andrew S. Tanenbaum");

//Obtenemos nombres de los libros
console.log(user.getBookNames());

//Firma
console.log('\n' , '-----------------------------', '\n', 'Ejercicio realizado por: Alejandro Zammi - Coderhouse - Comisión 28855', '\n', '-----------------------------')


