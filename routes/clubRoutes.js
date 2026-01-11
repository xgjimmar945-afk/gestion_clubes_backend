// directorRoutes.js
const express = require('express');
const router = express.Router();
const clubController = require('../controllers/clubController');

router.get('/', clubController.getAllClubs); //Devuelve todos los clubes
router.get('/:id', clubController.getClubById); //Devuelve un club por su id
router.get('/ramas/:id', clubController.getClubByRama); //Devuelve un club por su id
router.post('/', clubController.createClub); //Crea un club
router.put('/:id', clubController.updateClub);
router.delete('/:id', clubController.deleteClub); //Borra un club

module.exports = router;
