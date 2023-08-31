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