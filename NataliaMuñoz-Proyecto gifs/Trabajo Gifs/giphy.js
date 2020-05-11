let buttomSwitch = document.querySelector('#switch');
buttomSwitch.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	buttomSwitch.classList.toggle('active');
	cambiarColorLetra();
	cambiarDeColorSuge();
	cambiarDeColorTen();
	cambiarImage();
});

var day = true;

function cambiarColorLetra() {
	let letra = document.getElementById('gifos');
	let letraColor = letra.style.color;

	if (day) {
		letra.style.color = '#f1f1f1';
		day = false;
	} else {
		letra.style.color = '#000';
		day = true;
	}
}

function cambiarDeColorSuge() {
	let today = document.getElementById('aviso');
	let todayHoy = today.style.background;

	if (todayHoy == '#f1f1f1') {
		today.style.background = '#f1f1f1';
	} else {
		today.style.background = '#f1f1f1';
	}
}

function cambiarDeColorTen() {
	let topic = document.getElementById('trending');
	let topicToday = topic.style.background;

	if (topicToday == '#f1f1f1') {
		topic.style.background = '#f1f1f1';
	} else {
		topic.style.background = '#f1f1f1';
	}
}

var dia = true;

function cambiarImage() {
	let logo = document.getElementById('logotipo');
	let logotipo = logo.src;

	if (dia) {
		logo.src = './imagenes/logogy2.png';
		dia = false;
	} else {
		logo.src = './imagenes/logogy1.png';
		dia = true;
	}
}

function mousseBnt() {
	let boton = document.getElementById('submit');
	boton.addEventListener('mouseover', () => {
		boton.style.background = 'rgb(233, 181, 181)';
	});
}
mousseBnt();

function mousseOuter() {
	let boton = document.getElementById('submit');
	boton.addEventListener('mouseout', () => {
		boton.style.background = '#f7c9f3';
	});
}
mousseOuter();

function validarF() {
	let formularioo = document.getElementsByName('formulario')[0];

	if (formularioo.nombre.value == 0) {
		alert('Complete el campo busqueda');
	}
}

var formm = document.getElementById('submit');
formm.addEventListener('click', validarF);

function devolver(q) {
	let apiKey = 'CGuP8yVvMq3A09zTK2BoMCvMYriB86zF';
	let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=6&q=${q}`;

	fetch(url)
		.then((data) => data.json())
		.then((json) => {
			console.log(json);

			var busqueda = document.getElementById('busqueda');
			var busqueda_Divs = ' ';

			json.data.forEach((obj) => {
				console.log(obj.images.original.url);
				var imagen = obj.images.original.url;
				var title = obj.title;

				busqueda_Divs += `<img src ="${imagen}" alt = "${title}" class="gifTs">`;
				busqueda.innerHTML = busqueda_Divs;
			});
		});
}

var formulario = document.getElementById('formulario');
var input = document.getElementById('valor');

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	var q = input.value;
	devolver(q);
	guardarBusquedas();
	mostrarGuardadas();
});

function trending() {
	let apiKey = 'CGuP8yVvMq3A09zTK2BoMCvMYriB86zF';
	let url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6`;

	fetch(url)
		.then((data) => data.json())
		.then((json) => {
			console.log(json);

			var resultado = document.getElementById('resultado');
			var resultado_Div = ' ';

			json.data.forEach((obj) => {
				console.log(obj.images.original.url);
				var imagen_url = obj.images.original.url;
				var titulo = obj.title;

				resultado_Div += `<img src ="${imagen_url}" alt = "${titulo}" class="gifT">`;
				resultado.innerHTML = resultado_Div;
			});
		});
}
trending();

let apiKey = 'CGuP8yVvMq3A09zTK2BoMCvMYriB86zF';
let url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=G`;
function mostrarSugerencias() {
	fetch(url)
		.then((data) => data.json())
		.then(mostrar);
}
function mostrar(json) {
	let contenedorSugerencias = document.getElementById('aleatorio');
	let box = document.createElement('div');
	box.classList.add('sugerencia');
	contenedorSugerencias.appendChild(box);
	let descripcion = document.createElement('p');
	descripcion.className = 'titulo';
	let tituloBuscar = json.data.title;
	descripcion.innerHTML = ' # ' + tituloBuscar;
	let cruz = document.createElement('img');
	cruz.classList.add('cruz');
	cruz.src = './imagenes/close.svg';
	descripcion.appendChild(cruz);
	box.appendChild(descripcion);
	let imagen = document.createElement('img');
	imagen.src = json.data.images.original.url;
	imagen.classList.add('pictures');
	imagen.id = 'giphy-sugerido';
	box.appendChild(imagen);
	let botonn = document.createElement('button');
	botonn.classList.add('giphys-sugeridos');
	botonn.innerHTML = 'Ver más';
	box.appendChild(botonn);

	botonn.addEventListener('click', () => {
		let buscador = document.getElementById('valor');
		buscador.value = tituloBuscar;
		let q = tituloBuscar;
		devolver(q);
	});
}

function sugerenciasPorTres() {
	for (i = 0; i < 3; i++) {
		mostrarSugerencias();
	}
}

sugerenciasPorTres();

function guardarBusquedas() {
	var arrayHistorial = [];
	let inputBuscar = document.getElementById('valor').value;
	let historialDeBusquedas = localStorage.getItem('busquedas guardadas');

	if (historialDeBusquedas !== null) {
		let arrayHistorial = JSON.parse(historialDeBusquedas);
		arrayHistorial.push(inputBuscar);

		localStorage.setItem('busquedas guardadas', JSON.stringify(arrayHistorial));
	} else {
		arrayHistorial.unshift(inputBuscar);
		localStorage.setItem('busquedas guardadas', JSON.stringify(arrayHistorial));
	}
}

function mostrarGuardadas() {
	let arrayBusquedasGuardadas = JSON.parse(localStorage.getItem('busquedas guardadas'));

	// SI NO HAY NADA EN EL LOCAL STORAGE...
	if (arrayBusquedasGuardadas === null) {
		contGenBusquedasGuardadas = document.getElementById('busquedas-previas');
		recuadroResultado = document.createElement('div');
		recuadroResultado.classList.add('recuadroResultados');
		recuadroResultadoTexto = document.createElement('a');
		recuadroResultadoTexto.classList.add('recuadroResultadoTextos');
		textoResultado = document.createTextNode('Sin busquedas');
		recuadroResultadoTexto.appendChild(textoResultado);
		recuadroResultado.appendChild(recuadroResultadoTexto);
		contGenBusquedasGuardadas.appendChild(recuadroResultado);
	}
	// SI HAY COSAS EN EL LOCAL...
	else {
		let contGenBusquedasGuardadas = document.getElementById('busquedas-previas');
		while (contGenBusquedasGuardadas.firstChild) {
			contGenBusquedasGuardadas.removeChild(contGenBusquedasGuardadas.firstChild);
		}
		for (i = 0; i < arrayBusquedasGuardadas.length; i++) {
			let contGenBusquedasGuardadas = document.getElementById('busquedas-previas');
			let recuadroResultado = document.createElement('div');
			recuadroResultado.classList.add('recuadroResultado');
			let recuadroResultadoTexto = document.createElement('a');
			recuadroResultadoTexto.classList.add('recuadroResultadoTexto');
			let textoResultado = document.createTextNode(arrayBusquedasGuardadas[i]);
			recuadroResultado.setAttribute('data-foo', arrayBusquedasGuardadas[i]);
			// AGREGA URL Y FUNCION ONCLICK A LOS GUIFOS
			recuadroResultadoTexto.appendChild(textoResultado);
			recuadroResultado.appendChild(recuadroResultadoTexto);
			contGenBusquedasGuardadas.appendChild(recuadroResultado);
		}
	}
}

mostrarGuardadas();
