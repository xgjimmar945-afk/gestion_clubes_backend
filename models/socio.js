const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('socio', {
    id_socio: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: "email"
    },
    id_club: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CLUB',
        key: 'id_club'
      }
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    altura_metros: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true
    },
    ha_pagado_cuota: {
      type: DataTypes.TINYINT(1),
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'SOCIO',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_socio" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "fk_socio_club",
        using: "BTREE",
        fields: [
          { name: "id_club" },
        ]
      },
    ]
  });
};
