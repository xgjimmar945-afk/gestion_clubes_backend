const SequelizeAuto = require("sequelize-auto");
const {logMensaje} = require("../utils/logger.js");
// Importar fichero de configuración con variables de entorno
const config = require('./config');

const auto = new SequelizeAuto(
  config.db.name, 
  config.db.user, 
  config.db.password, 
  {
    host: config.db.host,
    port: config.db.port,
    dialect: "mysql",
    directory: "./models", 
    caseModel: 'c', 
    caseFile: "c", 
    additional: {
      timestamps: false,
      
    },
    
  }
);

auto.run().then((data) => {
  logMensaje(data.tables);

  logMensaje(data.text);
});
