var Models = require('../models')
const sequelize = require('../config/sequelize')

const bomon = Models.bomon
const monhoctruoc = Models.monhoctruoc
const monhoc = Models.monhoc
const chuandaura_cdio = Models.chuandaura_cdio

/* Lay danh sach cac mon hoc */
exports.read = async function (req, res) {
    try {
        const monhocData = await monhoc.findAll({
            include: bomon
        })
        const data = await Promise.all(monhocData.map(async (monhoc) => {
            let cdr = await chuandaura_cdio.findAll({
                where: {
                    ma_monhoc: monhoc.id
                },
                order: [['ma_cdio', 'ASC']]
            })
            cdr = Array.from(new Set(cdr.map(_cdr => _cdr.ma_cdio))).join(' ')
            return {
                mamh: monhoc.id,
                tenmh: monhoc.ten,
                sotinchi: monhoc.sotinchi,
                bomon: monhoc.bomon.ten,
                phanloai: monhoc.phanloai,
                chuandaura: cdr
            }
        }))
        res.status(200).send(data)
    }
    catch (err) {
        res.status(500).send(err)
    }
}

/* Lay thong tin 1 mon hoc */
exports.readOne = function (req, res) {
    monhoc.findByPk(req.params.mamh, {
        include: [bomon, {
            model: monhoc,
            as: "montienquyet"
        }, {
                model: monhoctruoc,
                as: "monhoctruoc",
                include: [monhoc]
            }]
    })
        .then(data => {
            return res.status(200).send({
                mamh: data.id,
                tenmh: data.ten,
                sotinchi: data.sotinchi,
                mota: data.mota,
                bomon: data.bomon.ten,
                phanloai: data.phanloai,
                montienquyet: data.montienquyet && data.montienquyet.ten || null,
                monhoctruoc: data.monhoctruoc.map(monhoctruoc => monhoctruoc.monhoc.ten)
            })
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

/* Them 1 mon hoc moi */
exports.create = function (req, res) {
    const monhoctruocData = req.body.monhoctruoc.map(ma_monhoctruoc => ({
        ma_monhoc: req.body.mamh,
        ma_monhoctruoc
    }))
    monhoc.create({
        id: req.body.mamh,
        ten: req.body.tenmh,
        sotinchi: req.body.sotinchi,
        phanloai: req.body.phanloai,
        mota: req.body.mota,
        ma_bomon: req.body.bomon,
        ma_montienquyet: req.body.montienquyet,
        monhoctruoc: monhoctruocData
    }, {
        include: [{
            model: monhoctruoc,
            as: 'monhoctruoc'
        }]
    })
        .then(success => res.sendStatus(200))
        .catch(err => {
            res.status(400).json({ error: err.message })
        })
}

/* Chinh sua 1 mon hoc */
exports.update = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        await monhoctruoc.destroy({
            where: {
                ma_monhoc: req.params.mamh
            }
        })
        const monhoctruocMoi = req.body.monhoctruoc.map(monhoctruoc => {
            return ({
                ma_monhoc: req.params.mamh,
                ma_monhoctruoc: monhoctruoc
            })
        })
        await monhoctruoc.bulkCreate(monhoctruocMoi)
        //
        await monhoc.update({
            id: req.body.mamh,
            ten: req.body.tenmh,
            sotinchi: req.body.sotinchi,
            phanloai: req.body.phanloai,
            mota: req.body.mota,
            ma_bomon: req.body.mabomon,
            ma_montienquyet: req.body.montienquyet
        }, {
            where: {
                id: req.params.mamh
            }
        })
        await t.commit()
        res.sendStatus(200);
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

/* Xoa 1 mon hoc */
exports.delete = function (req, res) {
    monhoc.destroy({
        where: {
            id: req.params.mamh
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(err)
        })
}