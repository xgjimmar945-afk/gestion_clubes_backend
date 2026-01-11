const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo director
const Club = models.club;

class ClubService {
  async getAllClubs() {
    // Devuelve todos los clubes.
    const result = await Club.findAll();
    return result;
  }

  // Devuelve un club por su id
  async getClubById(id_club) {
    const club = await Club.findByPk(id_club);
    return club;
  }

  // Devuelve un club por su id
  async getClubByRama(id_rama) {
    const club = await Club.findAll({ where: { id_rama: id_rama } });
    return club;
  }

  async createClub(clubData) {
    try {
      const result = await Club.create(clubData);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async deleteClub(id_club) {
    const club = await Club.destroy({ where: { id_club: id_club } });
    return club;
  }

  async updateClub(id_club, clubData) {
    const club = await Club.update(clubData, { where: { id_club: id_club } });
    return club;
  }
}

module.exports = new ClubService();
