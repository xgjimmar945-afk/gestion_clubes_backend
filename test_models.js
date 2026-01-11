const { Sequelize } = require('sequelize');
const config = require('./config/config');
const initModels = require('./models/init-models');

const sequelize = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    {
        host: config.db.host,
        port: config.db.port,
        dialect: 'mysql',
        logging: false,
    }
);

const models = initModels(sequelize);

async function testModels() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Create a new Club with new fields
        const newClub = await models.club.create({
            nombre: 'Test Club',
            descripcion: 'A test club for verification',
            direccion: 'Test Address',
            fecha_fundacion: '2023-01-01',
            presupuesto_anual: 1000.50,
            esta_activo: 1
        });
        console.log('Club created:', newClub.toJSON());

        // Create a new Socio with new fields
        const newSocio = await models.socio.create({
            nombre: 'Test',
            apellido: 'Socio',
            email: `test${Date.now()}@example.com`,
            id_club: newClub.id_club,
            fecha_nacimiento: '1990-05-15',
            altura_metros: 1.75,
            ha_pagado_cuota: 1
        });
        console.log('Socio created:', newSocio.toJSON());

        // Verify fields
        if (newClub.presupuesto_anual == 1000.50 && newClub.esta_activo == 1) {
            console.log('Club fields verified successfully.');
        } else {
            console.error('Club fields verification failed.');
        }

        if (newSocio.fecha_nacimiento === '1990-05-15' && newSocio.altura_metros == 1.75 && newSocio.ha_pagado_cuota == 1) {
            console.log('Socio fields verified successfully.');
        } else {
            console.error('Socio fields verification failed.');
        }

        // Cleanup
        await newSocio.destroy();
        await newClub.destroy();
        console.log('Cleanup completed.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testModels();
