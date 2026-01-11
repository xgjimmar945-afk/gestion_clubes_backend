const initModels = require("../models/init-models.js").initModels;
const sequelize = require("../config/sequelize.js");

const models = initModels(sequelize);

const Rama = models.rama;

class RamaService {
    async getAllRama() {
        try {
            const data = await Rama.findAll();
            return data;
        } catch (err) {
            throw err;
        }
    }

    async getRamaById(id) {
        try {
            const data = await Rama.findByPk(id);
            return data;
        } catch (err) {
            throw err;
        }
    }

    async createRama(ramaData) {
        try {
            const result = await Rama.create(ramaData);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async updateRama(id, ramaData) {
        try {
            const result = await Rama.update(ramaData, { where: { id: id } });
            return result;
        } catch (err) {
            throw err;
        }
    }

    async deleteRama(id) {
        try {
            const result = await Rama.destroy({ where: { id: id } });
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new RamaService();
