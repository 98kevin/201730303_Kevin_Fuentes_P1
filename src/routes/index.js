const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

var tokens; 

//utilizaremos router para las rutas ya no app
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});

router.get('/ingreso', (req, res) => {
    res.render('ingreso', { max: 15 });
});


router.post('/evaluarContenido', (req,res) => {
    let response = evaluarContenido(req.body.textoDeIngreso);
    res.status(200).json({
        textoResultado: response
    });
});


function evaluarContenido(texto){
    tokens= texto.split(" ");
    return tokens;
}

router.get('/siguienteToken', (req,res) => {
    res.status(200).json({
        primerTokenActual: tokens[0]
    });
    tokens.shift(); //elimina el primer elemento
});

module.exports = router;