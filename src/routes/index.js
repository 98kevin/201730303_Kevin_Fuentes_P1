const express = require('express');
const router = express.Router();
router.use(express.json());

let codsOperadores = [43,45,42,47,37,61,60,62];
let codsAgrupadores = [40,41,123,125];
let codsSignos= [34,59];
let numeros = [48,49,50,51,52,53,54,55,56,57];
let minusculas = [65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90];
let mayusculas = [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122];

var codigo;
var tokens = [];
var tokenActual ="";
var x=0;
var texto;

var constPalabrasReservadas= ['variable','entero','decimal','booleano','cadena','si','sino','mientras','hacer']; 
var constBooleanos= ['VERDADERO','FALSO'];
var constComa= [','];

var palabrasReservadas= [];
var identificadores= [];
var numbers= [];
var comaFloante = [];
var boolenos= [];
var operadores= [];
var agrupadores= [];
var signos= [];


//utilizaremos router para las rutas ya no app
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});

router.get('/ingreso', (req, res) => {
    res.render('ingreso', { max: 15 });
});


router.post('/evaluarContenido', (req,res) => {
    console.log('Funcion post');
    texto=req.body.textoDeIngreso;
    let response = evaluarContenido();
    res.status(200).json({
        textoResultado: response
    });
});


router.get('/siguienteToken', (req,res) => {
    console.log(tokens[0]);
    res.status(200).json({
        primerTokenActual: tokens[0]
    });
    tokens.shift(); //elimina el primer elemento
});

function evaluarContenido(){
    do {
        codigo = texto.charCodeAt(x);
        console.log('Codigo del caracter: '+ codigo)
        console.log('longitud del token actual: '+tokenActual.length);
        if(tokenActual.length==0){
            console.log('Primera condicion');
            if(minusculas.includes(codigo) | mayusculas.includes(codigo)){  //identificadores
                evaluarIdentificador();
                continue;
            } else if(numeros.includes(codigo)){                            //numeros
                evaluarNumero();
                continue;
            } else if(codsOperadores.includes(codigo)){                     //operadores
                evaluarOperador();
                continue;
            } 
            else if(codsAgrupadores.includes(codigo)){                      //Agrupadores
                evaluarAgrupador();
                continue;
            }
            else if(codsSignos.includes(codigo)){                           //Signos
                evaluarSigno();
                continue;
            }else{                                                          //ninguno de los anteriores 
                x=x+1;
                codigo = texto.charCodeAt(x);
            }
        }
    } while (x < texto.length);
    
    console.log('Palabras Reservadas');
    console.log(palabrasReservadas);
    console.log('Identificadores');
    console.log(identificadores);
    console.log('Numeros');
    console.log(numbers);
    console.log('Punto Flotante');
    console.log(comaFloante);
    return tokens;
}


function evaluarIdentificador(){
    let bandera=true;
    while(bandera){ //mientras la bandera de todo correcto este levantada, se ejecuta el el ciclo while 
        //identificador
        if(minusculas.includes(codigo) | mayusculas.includes(codigo) | numeros.includes(codigo)){
            tokenActual= tokenActual + texto.charAt(x);
            x=x+1;  //sumamos una posicion al indice del arreglo de los caracteres 
            codigo = texto.charCodeAt(x);
        } else{
            clasficarIdentificador(tokenActual);
            tokens.push(tokenActual);  //se mete el token leido a los tokens 
            tokenActual='';      //reiniciamos el token 
            bandera=false;  //se baja la bandera de todo correcto 
            identifierFlag =false; 

        }
    }
}

function clasficarIdentificador(textoDelIdentificador){
    if(constPalabrasReservadas.includes(textoDelIdentificador)){
        palabrasReservadas.push(textoDelIdentificador);
    }else if(constBooleanos.includes(textoDelIdentificador)){
        boolenos.push(textoDelIdentificador);
    } else{
        identificadores.push(textoDelIdentificador);
    }
}

function evaluarNumero(){
    let bandera=true;
    while(bandera){
        //numero
        if(numeros.includes(codigo) | codigo == 44 ){
            tokenActual= tokenActual + texto.charAt(x);
            x=x+1;  //sumamos una posicion al indice del arreglo de los caracteres 
            codigo = texto.charCodeAt(x);
        } else{
            clasificarNumero(tokenActual);
            tokens.push(tokenActual);
            tokenActual='';       //reiniciamos el token 
            bandera=false;
            numberFlag=false;
        }
    }
}

function clasificarNumero(textoDelNumero){
    let arreglo = [];
    arreglo= textoDelNumero;
    let isComaFloante = false;
    for(let i=0; i<arreglo.length; i++){
        if(arreglo[i]===','){
            isComaFloante=true;
        }
    }
    if(isComaFloante){
        comaFloante.push(textoDelNumero);
    } else {
        numbers.push(textoDelNumero);
    }
}

function evaluarOperador(){
    let bandera=true;
    while(bandera){
        //Operador
        if(codsOperadores.includes(codigo)){
            tokenActual= tokenActual + texto.charAt(x);
            x=x+1;  //sumamos una posicion al indice del arreglo de los caracteres 
            codigo = texto.charCodeAt(x);
        } else{
            tokens.push(tokenActual);
            operadores.push(tokenActual);
            tokenActual='';      //reiniciamos el token 
            bandera=false; 
            symbolFlag=false;
        }
    }
}

function evaluarAgrupador(){
    let bandera=true;
    while(bandera){
        //numero
        if(codsAgrupadores.includes(codigo)){
            tokenActual= tokenActual + texto.charAt(x);
            x=x+1;  //sumamos una posicion al indice del arreglo de los caracteres 
            codigo = texto.charCodeAt(x);
        } else{
            tokens.push(tokenActual);
            agrupadores.push(tokenActual);
            tokenActual='';      //reiniciamos el token 
            bandera=false; 
            symbolFlag=false;
        }
    }
}

function evaluarSigno(){
    let bandera=true;
    while(bandera){
        //numero
        if(codsSignos.includes(codigo)){
            tokenActual= tokenActual + texto.charAt(x);
            x=x+1;  //sumamos una posicion al indice del arreglo de los caracteres 
            codigo = texto.charCodeAt(x);
        } else{
            tokens.push(tokenActual);
            signos.push(tokenActual);
            tokenActual='';      //reiniciamos el token 
            bandera=false; 
            symbolFlag=false;
        }
    }
}

module.exports = router;