// tipoController.js (refactorizado a async/await)
const ramaService = require('../services/ramaService');
const Respuesta = require('../utils/respuesta');

class RamaController {

    async getAllRama(req, res) {
        try {
            const data = await ramaService.getAllRama();
            return res.json(Respuesta.exito(data, 'Datos de ramas recuperados'));
        } catch (err) {
            return res.status(500).json(Respuesta.error(err, 'Error al recuperar los datos: ' + req.originalUrl));
        }
    }

    async getRamaById(req, res) {
        const id = req.params.id;
        try {
            const data = await ramaService.getRamaById(id);
            if (!data || (Array.isArray(data) && data.length === 0)) {
                return res.status(404).json(Respuesta.error(null, `Rama con id ${id} no encontrado`));
            }
            return res.json(Respuesta.exito(data[0] || data, 'Rama recuperado'));
        } catch (err) {
            return res.status(500).json(Respuesta.error(err, 'Error al recuperar la rama: ' + req.originalUrl));
        }
    }

    async createRama(req, res) {
        const ramaData = req.body;
        try {
            const result = await ramaService.createRama(ramaData);
            // result.insertId normalmente contiene el id creado
            return res.status(201).json(Respuesta.exito({ insertId: result.insertId }, 'Rama creada correctamente'));
        } catch (err) {
            return res.status(500).json(Respuesta.error(err, 'Error al crear la rama'));
        }
    }

    async updateRama(req, res) {
        const id = req.params.id;
        const ramaData = req.body;
        try {
            const result = await ramaService.updateRama(id, ramaData);
            if (result.affectedRows === 0) {
                return res.status(404).json(Respuesta.error(null, `Rama con id ${id} no encontrado`));
            }
            return res.json(Respuesta.exito(result, 'Rama actualizada correctamente'));
        } catch (err) {
            return res.status(500).json(Respuesta.error(err, 'Error al actualizar la rama'));
        }
    }

    async deleteRama(req, res) {
        const id = req.params.id;
        try {
            const result = await ramaService.deleteRama(id);
            if (result.affectedRows === 0) {
                return res.status(404).json(Respuesta.error(null, `Rama con id ${id} no encontradq`));
            }
            return res.json(Respuesta.exito(result, 'Rama eliminada correctamente'));
        } catch (err) {
            return res.status(500).json(Respuesta.error(err, 'Error al eliminar la rama'));
        }
    }
}

module.exports = new RamaController();
