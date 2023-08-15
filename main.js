
// let nombreUsuario = prompt ("Buenas!! dime tu nombre.");
// alert ("Bienvenido " + nombreUsuario.toUpperCase() + ".");

const Merch = function(nombre, precio, stock, size){
    this.nombre= nombre,
    this.precio = precio
    this. stock = stock
    this.size = size
}

let prod1= new Merch ("remera 1", 25, 500, 4)
let prod2= new Merch ("remera 2", 25, 500, 4)
let prod3= new Merch ("remera 3", 27, 450, 4)
let prod4= new Merch ("remera 4", 27, 230, 4)
let prod5= new Merch ("remera 5", 35, 350, 4)
let prod6= new Merch ("remera 6", 35, 300, 4)
let prod7= new Merch ("taza 1", 15, 100, 250)
let prod8= new Merch ("taza 2", 17, 75, 250)
let prod9= new Merch ("jarra 1", 15, 100, 500)
let prod10= new Merch ("jarra 2", 17, 75, 500)

let bDD = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8, prod9, prod10]


localStorage.getItem("articulos") ? bDD = JSON.parse(localStorage.getItem("articulos")) : bDD = bDD



const contSearch = document.getElementById('searchContainer');

function buscarMerch() { 
  const body = document.querySelector('body');

  const input = document.getElementById('inputBuscar').value 

  const busqueda = input.trim().toUpperCase();

  const resultado = bDD.filter((articulo) => articulo.nombre.toUpperCase().includes(busqueda));

  if (resultado.length > 0) {
    const container = document.createElement('div');
    container.classList.add('contenedor');

    resultado.forEach((articulo) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const nombre = document.createElement('h2');
      nombre.textContent = articulo.nombre;
      card.appendChild(nombre);

      const precio = document.createElement('p');
      precio.textContent = `Precio: ${articulo.precio}`;
      card.appendChild(precio);

      const stock = document.createElement('p');
      stock.textContent = `Stock: ${articulo.stock}`;
      card.appendChild(stock);

      const size = document.createElement('p');
      size.textContent = `Size: ${articulo.size}`;
      card.appendChild(size);

      container.appendChild(card);
    });

    contSearch.appendChild(container);
  } else {
    alert('No se encontraron coincidencias');
	searchContainer.innerHTML = "";
  }
}



let contNew = document.getElementById('newContainer')

function agregarMerch() {
	const form = document.createElement('form');
	form.innerHTML = `
	  <label id="labels" for="nombre-input">Nombre:</label>
	  <input id="nombre-input" type="text" required>
	  
	  <label id="labels" for="precio-input">Precio:</label>
	  <input id="precio-input" type="number" step="0.01" required>
	  
	  <label id="labels" for="stock-input">Stock:</label>
	  <input id="stock-input" type="number" step="1" required>
  
	  <label id="labels" for="size-input">Size:</label>
	  <input id="size-input" required>
	  
	  <button id="agregarForm" type="submit">Agregar</button>
	`;
  
	form.addEventListener('submit', function (event) {
	  event.preventDefault();
  
	  const nombreInput = document.getElementById('nombre-input').value.trim();
	  const precioInput = parseFloat(document.getElementById('precio-input').value);
	  const stockInput = parseInt(document.getElementById('stock-input').value);
	  const sizeInput = document.getElementById('size-input').value.trim();
  
	  if (isNaN(precioInput) || isNaN(stockInput) || nombreInput === '' || sizeInput === '') {
		alert('Por favor ingresa valores válidos.');
		return;
	  }
  
	  const merch = new Merch(nombreInput, precioInput, stockInput, sizeInput);
  
	  if (bDD.some((elemento) => elemento.nombre === merch.nombre)) {
		alert('Ese articulo ya existe en la base de datos.');
		return;
	  }
  
	  bDD.push(merch);
    
	  localStorage.setItem("articulos", JSON.stringify(bDD));
  	  alert(`Se ha agregado el articulo "${merch.nombre}" a la base de datos.`);
  
	  console.table(bDD);
  
	  const container = document.createElement('div');
	  container.classList.add('contenedor');
  
	  bDD.forEach((articulo) => {
		const card = document.createElement('div');
		card.classList.add('card');
  
		const nombre = document.createElement('h2');
		nombre.textContent = articulo.nombre;
		card.appendChild(nombre);
  
		const precio = document.createElement('p');
		precio.textContent = `Precio: ${articulo.precio}`;
		card.appendChild(precio);
  
		const stock = document.createElement('p');
		stock.textContent = `Stock: ${articulo.stock}`;
		card.appendChild(stock);
  
		const size = document.createElement('p');
		size.textContent = `Size: ${articulo.size}`;
		card.appendChild(size);
  
		container.appendChild(card);
	  });
  
	  contNew.appendChild(container);
  
	  form.reset();
	});
  
	const main = document.querySelector('main');
	main.appendChild(form);
  }

bDD.sort((a, b) => a.precio - b.precio);
	console.table(bDD);

	const filtrarBtn = document.getElementById("botonBuscar");
		filtrarBtn.addEventListener("click", () => {
			buscarMerch();
		});

	const agregarBtn = document.getElementById("botonAgregar");
		agregarBtn.addEventListener("click", () => {
			agregarMerch();
		});

//console.log(agregarMerchandising())