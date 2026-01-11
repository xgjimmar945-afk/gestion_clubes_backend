// controllers/directorController.js
const socioService = require('../services/socioService.js');
const {logMensaje} = require("../utils/logger.js");
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

  async createSocio(req, res) {
    const socio = req.body;

    try {
      const socioNuevo = await socioService.createSocio(socio);
      return res.status(201).json({ ok: true, datos: socioNuevo, mensaje: 'Socio creado correctamente' });
    } catch (err) {
      console.error('Error en createSocio:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al crear el socio'
      });
    }
  }

  async deleteSocio(req, res) {
    const socioId = req.params.id;
    try {
      const result = await socioService.deleteSocio(socioId); //antes tenia clubService (puede que por eso al borrar el club se borraran los socios del club)
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Socio con id ${socioId} no encontrado`));
      }
      return res.status(204).end();
    } catch (err) {
      console.error('Error al eliminar socio:', err);
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

  async updateSocio(req, res) {
    const socioId = req.params.id;
    const socio = req.body;
    try {
      const result = await socioService.updateSocio(socioId, socio);
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Socio con id ${socioId} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Socio actualizado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

}

module.exports = new SocioController();
