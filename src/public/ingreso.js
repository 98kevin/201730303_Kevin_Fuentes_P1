//captura de los elementos del documento 
const input = document.getElementById('file');
const editor = document.getElementById('contenido');
const botonEnviar = document.querySelector("#botonEnviar");

//Evento del boton enviar
botonEnviar.addEventListener('click', evaluarTexto);


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

//Funcion del boton enviar
function evaluarTexto(){
  console.log('Funcion evaularTExto Activada');
    // POST
  axios.post(URL, {
    textoDeIngreso: editor.value
  })
  .then(handleSuccess)
  .catch(handleFailure);
};

// GET
axios.get(URL, { params: BODY })
  .then(handleSuccess)
  .catch(handleFailure);