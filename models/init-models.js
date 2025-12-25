var DataTypes = require("sequelize").DataTypes;
var _club = require("./club");
var _rama = require("./rama");
var _socio = require("./socio");

function initModels(sequelize) {
  var club = _club(sequelize, DataTypes);
  var rama = _rama(sequelize, DataTypes);
  var socio = _socio(sequelize, DataTypes);

  socio.belongsTo(club, { as: "id_club_CLUB", foreignKey: "id_club"});
  club.hasMany(socio, { as: "SOCIOs", foreignKey: "id_club"});
  club.belongsTo(rama, { as: "id_rama_RAMA", foreignKey: "id_rama"});
  rama.hasMany(club, { as: "CLUBs", foreignKey: "id_rama"});

  return {
    club,
    rama,
    socio,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
