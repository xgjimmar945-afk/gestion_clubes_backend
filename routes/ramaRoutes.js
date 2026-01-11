// ramaRoutes.js
const express = require('express');
const router = express.Router();
const ramaController = require('../controllers/ramaController');

router.get('/', ramaController.getAllRama);
router.get('/:id', ramaController.getRamaById);
router.post('/', ramaController.createRama);
router.put('/:id', ramaController.updateRama);
router.delete('/:id', ramaController.deleteRama);

module.exports = router;