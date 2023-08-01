
let nombreUsuario = prompt ("Hola, dime tu nombre por favor.")

alert ("Bienvenido " + nombreUsuario.toUpperCase() + ".")
alert ("Este es un simulador donde podras buscar un articulo y si lo deseas agregar nuevos")

const Merchandising = function(nombre, precio, stock, talles){
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.talles = talles;
}

let producto1 = new Merchandising("remera 1", 25, 500, 5)
let producto2 = new Merchandising("remera 2", 25, 500, 5)
let producto3 = new Merchandising("remera 3", 27, 450, 5)
let producto4 = new Merchandising("remera 4", 27, 400, 6)
let producto5 = new Merchandising("campera 5", 35, 200, 6)
let producto6 = new Merchandising("campera 6", 35, 200, 6)

let lista = [producto1, producto2, producto3, producto4, producto5, producto6]

let comienzoBusqueda = parseInt(prompt("Si quieres comenzar con la busqueda digita 1 de lo contrario digita 0"));

while(comienzoBusqueda >= 1){

	function filtrarProducto(){
		let busqueda = prompt("Escribe lo que estas buscando")
		let resultado = lista.filter( (articulo)=> articulo.nombre.includes(busqueda))

		if(resultado.length > 0){
			console.table(resultado)
		} else{
			alert ("No se encontró ninguna coincidencia con: " + busqueda)
			console.log("Buscaste: " + busqueda)
		}
	}	

	console.log(filtrarProducto())

 comienzoBusqueda = parseInt(prompt("La busqueda ha finalizado, ingresa 0 para salir o 1 para empezar una nueva."));

}

alert ("En este momento momento puedes optar por agregar nuevos articulos a la lista de Merchandising")


let quieroAgregar = prompt("Si quieres agregar un nuevo articulo digita Y de lo contrario ingresa otra letra")

while(quieroAgregar == "y" && "Y"){
    function agregarMerchandising(){
        let nombre = prompt("Ingresa el nombre del articulo.")
        let precio = parseInt(prompt("Ingresa cual es el costo."))
        let stock = parseInt(prompt("Ingresa con cuanto stock dispones."))
        let talles = parseInt(prompt("Ingresa con cuantas posibilidades de talles te encuentras."))

        if (nombre === "" || isNaN(precio) || isNaN(stock) || isNaN(talles)){
            alert ("No ingresaste los datos correctos prueba de nuevo.")
            return
        }

        let articulo = new Merchandising(nombre, precio, stock, talles)
        lista.push(articulo)

        console.table(lista)
    }

    console.log(agregarMerchandising())

    quieroAgregar = prompt("Deseas seguir agregando?");

}
