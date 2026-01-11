// ramaRoutes.js
const express = require('express');
const router = express.Router();
const ramaController = require('../controllers/ramaController');

router.get('/', ramaController.getAllRama);
router.get('/:id', ramaController.getRamaById);

module.exports = router;