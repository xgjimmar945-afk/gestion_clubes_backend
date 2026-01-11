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
}

module.exports = new RamaService();
