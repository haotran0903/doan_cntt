const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('monhoc', {
    id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    ten: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: "monhoc_ten_key"
    },
    sotinchi: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    mota: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ma_bomon: {
      type: DataTypes.STRING(10),
      allowNull: false,
      references: {
        model: 'bomon',
        key: 'id'
      }
    },
    phanloai: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    ma_montienquyet: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'monhoc',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'monhoc',
    schema: 'public',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "monhoc_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "monhoc_ten_key",
        unique: true,
        fields: [
          { name: "ten" },
        ]
      },
    ]
  });
};
