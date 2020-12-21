const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chuandaura_cdio', {
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'ma_monhoc'
      }
    },
    ma_cdr: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'chuandaura',
        key: 'ma_monhoc'
      }
    },
    ma_cdio: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cdio',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'chuandaura_cdio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chuandaura_cdio_pkey",
        unique: true,
        fields: [
          { name: "ma_monhoc" },
          { name: "ma_cdr" },
          { name: "ma_cdio" },
        ]
      },
    ]
  });
};
