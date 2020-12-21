const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bomon', {
    id: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true
    },
    ten: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    mota: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bomon',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bomon_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
