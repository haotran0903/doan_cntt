const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('danhgia_chuandaura', {
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danhgia',
        key: 'ma_monhoc'
      }
    },
    ma_danhgia: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'danhgia',
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
    }
  }, {
    sequelize,
    tableName: 'danhgia_chuandaura',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "danhgia_chuandaura_pkey",
        unique: true,
        fields: [
          { name: "ma_monhoc" },
          { name: "ma_danhgia" },
          { name: "ma_cdr" },
        ]
      },
    ]
  });
};
