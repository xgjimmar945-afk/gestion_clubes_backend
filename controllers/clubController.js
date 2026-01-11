// controllers/directorController.js
const clubService = require('../services/clubService.js');
const {logMensaje} = require("../utils/logger.js");
const Respuesta = require("../utils/respuesta.js");

class ClubController {
  async getAllClubs(req, res) {
    try {
      const clubes = await clubService.getAllClubs();
      logMensaje('Clubes recuperados correctamente');
      return res.status(200).json({
        ok: true,
        datos: clubes,
        mensaje: 'Clubes recuperados correctamente'
      });
    } catch (err) {
      console.error('Error en getAllClubes:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar clubes'
      });
    }
  }

  async getClubById(req, res) {
    try {
      const club = await clubService.getClubById(req.params.id);

      if (club) {
        return res.status(200).json({
          ok: true,
          datos: club,
          mensaje: 'Club recuperado correctamente'
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: 'Club no encontrado'
        });
      }
    } catch (err) {
      console.error('Error en getClubById:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar el club'
      });
    }
  }

  async getClubByRama(req, res) {
    try {
      const club = await clubService.getClubByRama(req.params.id);

      if (club) {
        return res.status(200).json({
          ok: true,
          datos: club,
          mensaje: 'Club recuperado correctamente'
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: 'Club no encontrado'
        });
      }
    } catch (err) {
      console.error('Error en getClubByRama:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al recuperar el club'
      });
    }
  }

  async createClub(req, res) {
    const club = req.body;

    try {
      const clubNuevo = await clubService.createClub(club);
      return res.status(201).json({ ok: true, datos: clubNuevo, mensaje: 'Club creado correctamente' });
    } catch (err) {
      console.error('Error en createClub:', err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: 'Error al crear el club'
      });
    }
  }

  async deleteClub(req, res) {
    const clubId = req.params.id;
    try {
      const result = await clubService.deleteClub(clubId);
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Club con id ${clubId} no encontrado`));
      }
      return res.status(204).end();
    } catch (err) {
      console.error('Error al eliminar club:', err);
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

  async updateClub(req, res) {
    const clubId = req.params.id;
    const club = req.body;
    try {
      const result = await clubService.updateClub(clubId, club);
      if (!result || result.affectedRows === 0) {
        return res.status(404).json(Respuesta.error(null, `Club con id ${clubId} no encontrado`));
      }
      return res.json(Respuesta.exito(result, 'Club actualizado correctamente'));
    } catch (err) {
      return res.status(500).json(Respuesta.error(err, 'Error interno del servidor'));
    }
  }

  
}

module.exports = new ClubController();
