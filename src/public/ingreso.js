//captura de los elementos del documento 
const input = document.getElementById('file');
const editor = document.getElementById('contenido');
const botonEnviar = document.querySelector("#botonEnviar");
const botonSiguienteToken= document.querySelector("#botonRecibirToken");
let resultado = document.getElementById('resultado');

//Evento del boton enviar
botonEnviar.addEventListener('click', evaluarTexto);
//Evento de recibir siguiente token 
botonSiguienteToken.addEventListener('click', obtenerSiguienteToken);

input.addEventListener('change', function () {
  if (input.files.length > 0) {
    readFile(input.files[0]);
  }
});

function readFile(file) {
  const reader = new FileReader();
  reader.onload = function() {
    editor.value= reader.result; 
  }
  reader.readAsText(file);
}

var URL = 'http://localhost:3000/evaluarContenido';

function handleSuccess(data) { console.log(data); }
function handleFailure(data) { console.log('error', data); }

//Funcion del boton enviar texto
function evaluarTexto(){
  console.log('Funcion evaularTExto Activada');
    // POST
  axios.post(URL, {
    textoDeIngreso: editor.value
  })
  .then(response => {
    console.log(response)
  })
  .catch(handleFailure);
  alert('Texto Ingresado')
};

function obtenerSiguienteToken(){
  axios.get('/siguienteToken')
  .then(response => {
    console.log(response);
    resultado.innerHTML += "<tr><td>"+response.data.primerTokenActual+"</td></tr>";
  })
  .catch(handleFailure);
};