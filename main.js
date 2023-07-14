let nombre = prompt ("Hola, escribe tu nombre.")

alert ("Gracias " + nombre.toUpperCase()+ "!")
alert ("Ahora te voy a pedir que ingreses 5 numeros")

function promedio(){
    let suma = 0;
    let cantidadNumeros = 5;

    for(let i = 0; i < cantidadNumeros; i++){
        let numero = parseFloat(prompt("Ingresa el numero " + (i+1) + ":"))
        while (isNaN(numero)){
            numero = parseFloat(prompt("Ingresa el numero " + (i+1) + ":"))
            console.log("No ingresaste un numero, por favor intenta de nuevo.");
        }

        suma += numero;
        console.log("Numero " + (i+1) + ":" + numero);

    }

    let promedio = suma / cantidadNumeros
    console.log ("El promedio de los numeroes ingresados es: " + promedio);
}

promedio();

