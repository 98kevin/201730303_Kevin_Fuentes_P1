const input = document.getElementById('file');
const editor = document.getElementById('contenido');

input.addEventListener('change', function () {
    alert("Evaluando funcio")
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