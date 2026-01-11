// directorRoutes.js
const express = require('express');
const router = express.Router();
const socioController = require('../controllers/socioController');

router.get('/', socioController.getAllSocios); //Devuelve todos los socioes
router.get('/:id', socioController.getSocioById); //Devuelve un socio por su id
router.get('/club/:id', socioController.getSocioByIdClub); //Devuelve un socio por su idClub
router.post('/', socioController.createSocio); //Crea un socio
router.put('/:id', socioController.updateSocio); //Actualiza un socio
router.delete('/:id', socioController.deleteSocio); //Borra un socio

module.exports = router;