const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chuandaura', {
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ma_muctieu: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'muctieu',
        key: 'ma_monhoc'
      }
    },
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'muctieu',
        key: 'ma_monhoc'
      }
    },
    mota: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'chuandaura',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "chuandaura_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "ma_monhoc" },
        ]
      },
    ]
  });
};
