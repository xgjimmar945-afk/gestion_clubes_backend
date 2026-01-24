const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");

const models = initModels(sequelize);

const Socio = models.socio;

const { Op } = require("sequelize");

class SocioService {
    async getAllSocios() {
        try {
            const data = await Socio.findAll();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getSocioById(id) {
        try {
            const data = await Socio.findByPk(id);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getSocioByIdClub(id_club) {
        try {
            const data = await Socio.findAll({ where: { id_club: id_club } });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getSociosByFechaNacimiento(fechaInicio, fechaFin) {
        try {
            const data = await Socio.findAll({
                where: {
                    fecha_nacimiento: {
                        [Op.between]: [fechaInicio, fechaFin]
                    }
                },
                include: [{
                    model: models.club,
                    as: 'id_club_CLUB'
                }]
            });
            return data;
        } catch (err) {
            throw err;
        }
    }

    async createSocio(socioData) {
        try {
            const result = await Socio.create(socioData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateSocio(id_socio, socioData) {
        try {
            const result = await Socio.update(socioData, { where: { id_socio: id_socio } });
            return result;
        } catch (err) {
            throw err;
        }
    }

    async deleteSocio(id_socio) {
        try {
            const result = await Socio.destroy({ where: { id_socio: id_socio } });
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new SocioService();
