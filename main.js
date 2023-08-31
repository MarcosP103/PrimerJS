
const Merch = function(nombre, precio, stock, size){
    this.nombre= nombre,
    this.precio = precio
    this.stock = stock
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

function cargarMerch(){
	return new Promise((resolve, reject) => {
		console.log("cargando Merch...");

		setTimeout(() => {
			resolve(Merch);
		}, 8000);
	});
}

cargarMerch();

function buscarMerch() {
	searchContainer.innerHTML = ""; //reset contenedor
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

	  const boton = document.createElement('button');
	  boton.type = 'button'; boton.id = "botonCarrito"
	  boton.addEventListener("click", () => {
		muestraHtml});
	  boton.innerText = 'Al Carrito!';
	  card.appendChild(boton);

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
	newContainer.innerHTML = "";

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

		const btnCarrito = document.querySelector('.container-cart-icon');
		const contCarritoProductos = document.querySelector('.container-cart-products');
		
		btnCarrito.addEventListener('click', () => {
			contCarritoProductos.classList.toggle('hiddencart')
		});
		
		const carritoProducto = document.querySelector('.cart-product');
		const rowProducto = document.querySelector('.row-product');
		
		let listaProductos = document.querySelector('.contenedorcardhtml');
		
		let todosProductos = [];
		
		const valorTotal =  document.querySelector('.total-pagar');
		const contador = document.querySelector('#contador-productos');
		
		const carritoVacio = document.querySelector('.carritovacio');
		const carritoTotal = document.querySelector('.carritototal');
		
		listaProductos.addEventListener('click', c => {
			if(c.target.classList.contains('btn-primary')){
				const producto = c.target.parentElement;
		
				const infoProducto = {
					quantity: 1,
					title: producto.querySelector('h5').textContent,
					price: producto.querySelector('p').textContent, 
				};

				Swal.fire({
					title: 'Agregado!',
					icon: 'success',
				});
		
				const existe = todosProductos.some(producto => producto.title === infoProducto.title);
				if(existe){
					const productos = todosProductos.map(producto => {
						if(producto.title === infoProducto.title){
							producto.quantity++;
							return producto;
						}else{
							return producto;
						}
					})
					todosProductos = [...productos];
				}else{
					todosProductos = [...todosProductos, infoProducto];
				}
		
				muestraHtml();
			}
		
		})
		
		rowProducto.addEventListener('click', c => {
			if(c.target.classList.contains('iconox')){
				const producto = c.target.parentElement;
				const title = producto.querySelector('p').textContent;
		
				todosProductos = todosProductos.filter(
					producto => producto.title !== title
				);
				Swal.fire({
					title: 'Eliminaste este articulo del carrito',
					icon: 'error',
				});
		
				muestraHtml()
			}
		
		})
		
		const muestraHtml = () => {
			if(!todosProductos.length){
				carritoVacio.classList.remove('hidden');
				rowProducto.classList.add('hidden');
				carritoTotal.classList.add('hidden');
			}else{
				carritoVacio.classList.add('hidden');
				rowProducto.classList.remove('hidden');
				carritoTotal.classList.remove('hidden');
			}
		
			rowProducto.innerHTML = '';
		
			let total = 0;
			let totalProductos = 0;
		
			todosProductos.forEach(producto => {
				const contenedorProducto = document.createElement('div');
				contenedorProducto.classList.add('cart-product');
		
				contenedorProducto.innerHTML = `
				<div class="info-cart-product">
					<span class="cantidad-producto-carrito">${producto.quantity}</span>
					<p class="titulo-producto-carrito">${producto.title}</p>
					<span class="precio-producto-carrito">${producto.price}</span>
				</div>
				  <img class="iconox" src="../assets/x.png">
				`;
		
				rowProducto.append(contenedorProducto);
		
				total = total + parseInt(producto.quantity * producto.price.slice(1))
				totalProductos+=producto.quantity;
			});
		
			valorTotal.innerText = `$${total}`;
			contador.innerText = totalProductos;
		}