let nombre = prompt ("Hola, escribe tu nombre.")

alert ("Gracias " + nombre.toUpperCase()+ "!")
alert ("Ahora te voy a pedir que ingreses 5 numeros")

function promedio(){
    let num1 = parseInt(prompt("Ingresa el primer numero:")), 
        num2 = parseInt(prompt("Ingrese el segundo numero:")),
        num3 = parseInt(prompt("Ingresa el tercer numero:")),
        num4 = parseInt(prompt("Ingresa el cuarto numero:")),
        num5 = parseInt(prompt("Ingresa el quinto y ultimo numero:"));

    if (isNaN(num1 && num2 && num3 && num4 && num5)){
    return "No ingresaste la totalidad de los numeros";
    } else{
        return (num1+num2+num3+num4+num5)/5
    }
    
}

console.log("El promedio de los numeros ingresados es: " + promedio())
