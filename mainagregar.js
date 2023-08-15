
let contrasena = prompt ("buenas! por favor para ingresar ingreasa la contraseña adecuada");

if (contrasena = "123456"){
    alert('Bienvenido!');
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
} else{
    <script type="text/javascript">
   window.location.href = "index.html";
</script>
}

