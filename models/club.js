const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('club', {
    id_club: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fecha_fundacion: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    id_rama: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'RAMA',
        key: 'id_rama'
      }
    },
    presupuesto_anual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    },
    esta_activo: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'CLUB',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_club" },
        ]
      },
      {
        name: "fk_club_rama",
        using: "BTREE",
        fields: [
          { name: "id_rama" },
        ]
      },
    ]
  });
};
