
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
    Swal.fire({
		title: 'No se encontraron coincidencias',
		icon: 'warning',
		timer: 2000 
	  });
  
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
		Swal.fire({
			title: 'Por favor ingresa valores validos.',
			icon: 'warning',
			timer: 2000 
		  }); 
		return;
	  }
  
	  const merch = new Merch(nombreInput, precioInput, stockInput, sizeInput);
  
	  if (bDD.some((elemento) => elemento.nombre === merch.nombre)) {
		Swal.fire({
			title: 'Ya existe el articulo',
			icon: 'error',
			timer: 2000 
		  });
		return;
	  }
  
	  bDD.push(merch);
    
	  localStorage.setItem("articulos", JSON.stringify(bDD));
	  Swal.fire({
		title: 'Agregado al localStorage!',
		icon: 'success',
		timer: 2000 
	  });
  
  
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
	if (filtrarBtn) {
		filtrarBtn.addEventListener("click", () => {
			buscarMerch();
		});
	}
		
const agregarBtn = document.getElementById("botonAgregar");
	if (agregarBtn) {
		agregarBtn.addEventListener("click", () => {
			agregarMerch();
		});
	}

const btnCarrito = document.querySelector('.container-cart-icon');
const contCarritoProductos = document.querySelector('.container-cart-products');
		
btnCarrito.addEventListener('click', () => {
		contCarritoProductos.classList.toggle('hidden-cart')
});
		
const carritoProducto = document.querySelector('.cart-product');
const rowProducto = document.querySelector('.row-product');
		
let listaProductos = document.querySelector('.contenedorcardhtml');
		
let todosProductos = [];
localStorage.getItem("carrito") ? todosProductos = JSON.parse(localStorage.getItem("carrito")) : todosProductos = todosProductos;
		
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
		});
		todosProductos = [...productos];
	}else{
		todosProductos = [...todosProductos, infoProducto];
	}
		localStorage.setItem('carrito', JSON.stringify(todosProductos))		
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
			icon: 'warning',
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
	let cruz = document.getElementsByClassName('index').length != 0 ? "assets/x.png" : "../assets/x.png"
		
	todosProductos.forEach(producto => {
		const contenedorProducto = document.createElement('div');
		contenedorProducto.classList.add('cart-product');

		contenedorProducto.innerHTML = `
			<div class="info-cart-product">
				<span class="cantidad-producto-carrito">${producto.quantity}</span>
				<p class="titulo-producto-carrito">${producto.title}</p>
				<span class="precio-producto-carrito">${producto.price}</span>
			</div>
			  <img class="iconox" src=${cruz}>
		`;
		
	rowProducto.append(contenedorProducto);
		
	total = total + parseInt(producto.quantity * producto.price.slice(1))
	totalProductos+=producto.quantity;
	});
		
	valorTotal.innerText = `$${total}`;
	contador.innerText = totalProductos;
	}
	if (todosProductos) {
		muestraHtml();
	}

//API
'use strict';

let weatherWidget = {
    settings: {
        api_key: '6bd5b850178e2134497c4b965fbaf54e',
        weather_url: 'https://api.openweathermap.org/data/2.5/weather',
        forecast_url: 'https://api.openweathermap.org/data/2.5/forecast',
        search_type: 'city_name',
        city_name: 'montevideo',
        units: 'metric',
        icon_mapping: {
            '01d': 'wi-day-sunny',
            '01n': 'wi-day-sunny',
            '02d': 'wi-day-cloudy',
            '02n': 'wi-day-cloudy',
            '03d': 'wi-cloud',
            '03n': 'wi-cloud',
            '04d': 'wi-cloudy',
            '04n': 'wi-cloudy',
            '09d': 'wi-rain',
            '09n': 'wi-rain',
            '10d': 'wi-day-rain',
            '10n': 'wi-day-rain',
            '11d': 'wi-thunderstorm',
            '11n': 'wi-thunderstorm',
            '13d': 'wi-snow',
            '13n': 'wi-snow',
            '50d': 'wi-fog',
            '50n': 'wi-fog'
        }
    },
    constant: {
        dow: ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab']
    }
};

weatherWidget.init = function (settings) {
    this.settings = Object.assign(this.settings, settings);
    Promise.all([this.getWeather(), this.getForecast()]).then((resolve) => {
        let weather = resolve[0];
        let forecast = resolve[1].list;

        document.getElementsByClassName('ow-city-name')[0].innerHTML = weather.name;
        document.getElementsByClassName('ow-temp-current')[0].innerHTML = Math.round(weather.main.temp) + '&deg';
        document.getElementsByClassName('ow-pressure')[0].innerHTML = weather.main.pressure + ' hPa';
        document.getElementsByClassName('ow-humidity')[0].innerHTML = weather.main.humidity + '%';
        document.getElementsByClassName('ow-wind')[0].innerHTML = weather.wind.speed + ' km/h';
        if (!!this.settings.icon_mapping[weather.weather[0].icon]) {
            let icon = this.settings.icon_mapping[weather.weather[0].icon];
            let ico_current =  document.getElementsByClassName('ow-ico-current')[0];
            if (ico_current.classList) {
                ico_current.classList.add(icon);
            } else {
                ico_current.className += ' ' + icon;
            }

        }

        forecast = forecast.filter((x) => {
            return x.dt_txt.substr(0, 10) !== new Date().toJSON().slice(0, 10);
        });

        let fs = [];

        for (let f of forecast) {
            let date = f.dt_txt.substr(0, 10);
            if (!!fs[date]) {
                fs[date].temp_max = f.main.temp_max > fs[date].temp_max ? f.main.temp_max : fs[date].temp_max;
                fs[date].temp_min = f.main.temp_min < fs[date].temp_min ? f.main.temp_min : fs[date].temp_min;
                fs[date].icons.push(f.weather[0].icon);
            } else {
                fs[date] = {
                    dow: this.constant.dow[new Date(date).getDay()],
                    temp_max: f.main.temp_max,
                    temp_min: f.main.temp_min,
                    icons: [f.weather[0].icon]
                }
            }
        }

        let forecast_items = document.getElementsByClassName('ow-forecast-item');

        let counter = 0;
        for (let day in fs) {
            let icon = this.settings.icon_mapping[this.getIconWithHighestOccurence(fs[day].icons)];
            let fi = forecast_items[counter];
            fi.getElementsByClassName('max')[0].innerHTML = Math.round(fs[day].temp_max) + '&deg';
            fi.getElementsByClassName('min')[0].innerHTML = Math.round(fs[day].temp_min) + '&deg';
            fi.getElementsByClassName('ow-day')[0].innerHTML = fs[day].dow;
            let ico_current =  fi.getElementsByClassName('ow-ico-forecast')[0];
            if (ico_current.classList) {
                ico_current.classList.add(icon);
            } else {
                ico_current.className += ' ' + icon;
            }
            counter++;
        };
    });
};

weatherWidget.getForecast = function () {
    let params = {
        'q': this.settings.city_name,
        'APPID': this.settings.api_key,
        'units': this.settings.units
    };

    let p = '?' + Object.keys(params)
            .map((key) => {
                return key + '=' + params[key]
            })
            .join('&');
    return this.makeRequest(this.settings.forecast_url, p);
};

weatherWidget.getWeather = function () {
    let params = {
        'q': this.settings.city_name,
        'APPID': this.settings.api_key,
        'units': this.settings.units
    };

    let p = '?' + Object.keys(params)
            .map((key) => {
                return key + '=' + params[key]
            })
            .join('&');
    return this.makeRequest(this.settings.weather_url, p);
};

weatherWidget.makeRequest = function (url, params) {
    return new Promise(function (resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', url + params, true);
        req.responseType = 'json';

        req.onload = function () {
            if (req.status >= 200 && req.status < 400) {
                resolve(req.response);
            } else {
                reject(Error(req.status));
            }
        };

        req.onerror = () => reject('Error occured while connecting to Weather API');
        req.send(params);
    });
};

weatherWidget.getIconWithHighestOccurence = function (a) {
    let elems = Array.prototype.slice.call('a');
    return elems.sort((a, b) =>
        elems.filter(v => v === a).length - elems.filter(v => v === b).length
    ).pop();
}

let widget = Object.create(weatherWidget);
widget.init({
  city_name: 'Montevideo'
});
