const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cdio', {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    chuandaura: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    trinhdonangluc: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cdio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cdio_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
