const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('noidungchitiet', {
    chuong: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    tuan: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    },
    nd_trenlop: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nd_onha: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'noidungchitiet',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "noidungchitiet_pkey",
        unique: true,
        fields: [
          { name: "chuong" },
          { name: "ma_monhoc" },
        ]
      },
    ]
  });
};
