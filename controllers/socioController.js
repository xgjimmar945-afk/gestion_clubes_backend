// controllers/directorController.js
const socioService = require('../services/socioService.js');
const { logMensaje } = require("../utils/logger.js");
const Respuesta = require("../utils/respuesta.js");

class SocioController {
  async getAllSocios(req, res) {
    try {
      const socios = await socioService.getAllSocios();
      logMensaje('Socios recuperados correctamente');
      return res.status(200).json({
        ok: true,
        datos: socios,
        mensaje: 'Socios recuperados correctamente'
      });
    } catch (err) {
      console.error('Error en getAllSocios:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar socios'
      });
    }
  }

  async getSocioById(req, res) {
    try {
      const socio = await socioService.getSocioById(req.params.id);

      if (socio) {
        return res.status(200).json({
          ok: true,
          datos: socio,
          mensaje: 'Socio recuperado correctamente'
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: 'Socio no encontrado'
        });
      }
    } catch (err) {
      console.error('Error en getSocioById:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar el socio'
      });
    }
  }

  async getSocioByIdClub(req, res) {
    try {
      const socios = await socioService.getSocioByIdClub(req.params.id);

      if (socios) {
        return res.status(200).json({
          ok: true,
          datos: socios,
          mensaje: 'Socios recuperados correctamente'
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: 'Socios no encontrados'
        });
      }
    } catch (err) {
      console.error('Error en getSocioByIdClub:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar el socio'
      });
    }
  }

  async getSociosByFechaNacimiento(req, res) {
    try {
      const { fechaInicio, fechaFin } = req.query;
      const socios = await socioService.getSociosByFechaNacimiento(fechaInicio, fechaFin);

      if (socios) {
        return res.status(200).json({
          ok: true,
          datos: socios,
          mensaje: 'Socios recuperados correctamente'
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: 'Socios no encontrados'
        });
      }
    } catch (err) {
      console.error('Error en getSociosByFechaNacimiento:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar socios por fecha'
      });
    }
  }

  async createSocio(req, res) {
    const socio = req.body;

    try {
      const socioNuevo = await socioService.createSocio(socio);
      return res.status(201).json({ ok: true, datos: socioNuevo, mensaje: 'Socio creado correctamente' });
    } catch (err) {
      // SI EL ERROR ES DE VALIDACIÓN (Faltan nombre, apellido, etc.)
      if (err.name === 'SequelizeValidationError') {
        // No hacemos console.error para no ensuciar la terminal
        return res.status(400).json({
          ok: false,
          datos: null,
          mensaje: 'Error de validación: Faltan datos obligatorios (nombre, apellido...)'
        });
      }

      // SI ES OTRO TIPO DE ERROR (Base de datos caída, bug, etc.)
      console.error('Error en createSocio:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al crear el socio'
      });
    }
  }

  // --- CORRECCIÓN EN DELETE ---
  async deleteSocio(req, res) {
    const socioId = req.params.id;
    try {
      const result = await socioService.deleteSocio(socioId);
      
      // Sequelize .destroy() devuelve directamente un número entero
      // No devuelve affectedRows. Si devuelve 0, es que no borró nada.
      if (!result || result === 0) {
        return res.status(404).json(Respuesta.error(null, `Socio con id ${socioId} no encontrado`));
      }
      return res.status(204).end();
    } catch (err) {
      console.error('Error al eliminar socio:', err);
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

  // --- CORRECCIÓN EN UPDATE (Aquí estaba tu error actual) ---
  async updateSocio(req, res) {
    const socioId = req.params.id;
    const socio = req.body;
    try {
      const result = await socioService.updateSocio(socioId, socio);
      
      // Sequelize .update() devuelve un array: [numeroDeFilasAfectadas]
      // Debemos mirar la posición 0 del array.
      if (!result || result[0] === 0) {
        return res.status(404).json(Respuesta.error(null, `Socio con id ${socioId} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Socio actualizado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

}

module.exports = new SocioController();