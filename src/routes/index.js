const express = require('express');
const router = express.Router();
router.use(express.json());
const path = require('path');

//utilizaremos router para las rutas ya no app
router.get('/', (req, res) => {
    res.render('index', { max: 15 });
});

router.get('/ingreso', (req, res) => {
    res.render('ingreso', { max: 15 });
});


router.post('/evaluarContenido', (request,response) => {
    console.log('Podes hacer lo que queras con esta informacion');
    console.log(request.body.textoDeIngreso.value);
    response.status(200).send('exito');
});

module.exports = router;