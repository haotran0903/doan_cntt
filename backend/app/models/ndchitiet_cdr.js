const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ndchitiet_cdr', {
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'noidungchitiet',
        key: 'ma_monhoc'
      }
    },
    chuong: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'noidungchitiet',
        key: 'ma_monhoc'
      }
    },
    trenlop_onha: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
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
    tableName: 'ndchitiet_cdr',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ndchitiet_cdr_pkey",
        unique: true,
        fields: [
          { name: "ma_monhoc" },
          { name: "chuong" },
          { name: "trenlop_onha" },
          { name: "ma_cdr" },
        ]
      },
    ]
  });
};
