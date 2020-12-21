const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('monhoctruoc', {
    ma_monhoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    },
    ma_monhoctruoc: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'monhoctruoc',
    schema: 'public',
    timestamps: false,
    freezeTableName: true,
    indexes: [
      {
        name: "monhoctruoc_pkey",
        unique: true,
        fields: [
          { name: "ma_monhoc" },
          { name: "ma_monhoctruoc" },
        ]
      },
    ]
  });
};
