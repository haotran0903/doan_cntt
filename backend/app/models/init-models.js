var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");
var _bomon = require("./bomon");
var _cdio = require("./cdio");
var _chuandaura = require("./chuandaura");
var _chuandaura_cdio = require("./chuandaura_cdio");
var _danhgia = require("./danhgia");
var _danhgia_chuandaura = require("./danhgia_chuandaura");
var _monhoc = require("./monhoc");
var _monhoctruoc = require("./monhoctruoc");
var _muctieu = require("./muctieu");
var _ndchitiet_cdr = require("./ndchitiet_cdr");
var _noidungchitiet = require("./noidungchitiet");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);
  var bomon = _bomon(sequelize, DataTypes);
  var cdio = _cdio(sequelize, DataTypes);
  var chuandaura = _chuandaura(sequelize, DataTypes);
  var chuandaura_cdio = _chuandaura_cdio(sequelize, DataTypes);
  var danhgia = _danhgia(sequelize, DataTypes);
  var danhgia_chuandaura = _danhgia_chuandaura(sequelize, DataTypes);
  var monhoc = _monhoc(sequelize, DataTypes);
  var monhoctruoc = _monhoctruoc(sequelize, DataTypes);
  var muctieu = _muctieu(sequelize, DataTypes);
  var ndchitiet_cdr = _ndchitiet_cdr(sequelize, DataTypes);
  var noidungchitiet = _noidungchitiet(sequelize, DataTypes);

  chuandaura.belongsToMany(cdio, { through: chuandaura_cdio, foreignKey: "ma_cdr", otherKey: "ma_cdio" });
  cdio.belongsToMany(chuandaura, { through: chuandaura_cdio, foreignKey: "ma_cdio", otherKey: "ma_cdr" });
  cdio.belongsToMany(chuandaura, { through: chuandaura_cdio, foreignKey: "ma_cdio", otherKey: "ma_monhoc" });
  danhgia.belongsToMany(chuandaura, { through: danhgia_chuandaura, foreignKey: "ma_danhgia", otherKey: "ma_cdr" });
  chuandaura.belongsToMany(danhgia, { through: danhgia_chuandaura, foreignKey: "ma_cdr", otherKey: "ma_danhgia" });
  chuandaura.belongsToMany(danhgia, { through: danhgia_chuandaura, foreignKey: "ma_cdr", otherKey: "ma_monhoc" });
  monhoc.belongsToMany(monhoc, { as: "mh_truoc", through: monhoctruoc, foreignKey: "ma_monhoctruoc", otherKey: "ma_monhoc" });
  monhoc.belongsToMany(monhoc, { as: "mh", through: monhoctruoc, foreignKey: "ma_monhoc", otherKey: "ma_monhoctruoc" });
  noidungchitiet.belongsToMany(chuandaura, { through: ndchitiet_cdr, foreignKey: "ma_monhoc", otherKey: "ma_cdr" });
  chuandaura.belongsToMany(noidungchitiet, { through: ndchitiet_cdr, foreignKey: "ma_cdr", otherKey: "ma_monhoc" });
  chuandaura.belongsToMany(noidungchitiet, { through: ndchitiet_cdr, foreignKey: "ma_cdr", otherKey: "chuong" });
  chuandaura.belongsTo(muctieu, { foreignKey: "ma_monhoc" });
  muctieu.hasMany(chuandaura, { foreignKey: "ma_monhoc" });
  chuandaura.belongsTo(muctieu, { foreignKey: "ma_muctieu" });
  muctieu.hasMany(chuandaura, { foreignKey: "ma_muctieu" });
  chuandaura_cdio.belongsTo(cdio, { foreignKey: "ma_cdio" });
  cdio.hasMany(chuandaura_cdio, { foreignKey: "ma_cdio" });
  chuandaura_cdio.belongsTo(chuandaura, { foreignKey: "ma_cdr" });
  chuandaura.hasMany(chuandaura_cdio, { as: "chuandaura_cdio", foreignKey: "ma_cdr" });
  chuandaura_cdio.belongsTo(chuandaura, { foreignKey: "ma_cdr" });
  danhgia.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(danhgia, { foreignKey: "ma_monhoc" });
  danhgia_chuandaura.belongsTo(chuandaura, { foreignKey: "ma_cdr" });
  chuandaura.hasMany(danhgia_chuandaura, { foreignKey: "ma_cdr" });
  danhgia_chuandaura.belongsTo(danhgia, { foreignKey: "ma_danhgia" });
  danhgia.hasMany(danhgia_chuandaura, { foreignKey: "ma_danhgia" });
  monhoc.belongsTo(bomon, { foreignKey: "ma_bomon" });
  bomon.hasMany(monhoc, { foreignKey: "ma_bomon" });
  monhoc.belongsTo(monhoc, { foreignKey: "ma_montienquyet" });
  monhoc.hasOne(monhoc, { as: "montienquyet", foreignKey: "id", sourceKey: "ma_montienquyet" });
  monhoctruoc.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(monhoctruoc, { foreignKey: "ma_monhoctruoc" });
  monhoctruoc.belongsTo(monhoc, { foreignKey: "ma_monhoctruoc" });
  monhoc.hasMany(monhoctruoc, { as: "monhoctruoc", foreignKey: "ma_monhoc" });
  muctieu.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(muctieu, { foreignKey: "ma_monhoc" });
  ndchitiet_cdr.belongsTo(chuandaura, { foreignKey: "ma_cdr" });
  chuandaura.hasMany(ndchitiet_cdr, { foreignKey: "ma_cdr" });
  ndchitiet_cdr.belongsTo(noidungchitiet, { foreignKey: "ma_monhoc" });
  noidungchitiet.hasMany(ndchitiet_cdr, { foreignKey: "ma_monhoc" });
  ndchitiet_cdr.belongsTo(noidungchitiet, { foreignKey: "chuong" });
  noidungchitiet.hasMany(ndchitiet_cdr, { foreignKey: "chuong" });
  noidungchitiet.belongsTo(monhoc, { foreignKey: "ma_monhoc" });
  monhoc.hasMany(noidungchitiet, { foreignKey: "ma_monhoc" });

  return {
    account,
    bomon,
    cdio,
    chuandaura,
    chuandaura_cdio,
    danhgia,
    danhgia_chuandaura,
    monhoc,
    monhoctruoc,
    muctieu,
    ndchitiet_cdr,
    noidungchitiet,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
