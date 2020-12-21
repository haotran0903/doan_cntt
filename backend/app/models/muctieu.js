const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('muctieu', {
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    mota: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    ma_monhoc: {
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
    tableName: 'muctieu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "muctieu_pkey",
        unique: true,
        fields: [
          { name: "id" },
          { name: "ma_monhoc" },
        ]
      },
    ]
  });
};
