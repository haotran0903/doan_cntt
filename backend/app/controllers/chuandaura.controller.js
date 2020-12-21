var Models = require('../models')
const sequelize = require('../config/sequelize')

const chuandaura = Models.chuandaura
const chuandaura_cdio = Models.chuandaura_cdio
const muctieu = Models.muctieu

/* Lay thong tin chuan dau ra mon hoc */
exports.read = function (req, res) {
    muctieu.findAll({
        where: {
            ma_monhoc: req.params.mamh
        },
        include: [{
            model: chuandaura,
            where: {
                ma_monhoc: req.params.mamh
            },
            include: {
                model: chuandaura_cdio,
                as: "chuandaura_cdio",
                where: {
                    ma_monhoc: req.params.mamh
                },
            }
        }],
        order: [
            ['id', 'ASC'],
            [chuandaura, 'id', 'ASC'],
            [chuandaura, "chuandaura_cdio", 'ma_cdio', 'ASC']
        ]
    })
        .then(data => {
            data = data.map(muctieu => ({
                muctieu: muctieu.id,
                chuandaura: muctieu.chuandauras.map(cdr => ({
                    cdr: cdr.id,
                    mota: cdr.mota,
                    cdio: cdr.chuandaura_cdio.map(_cdio => _cdio.ma_cdio).join(' ')
                }))
            }))
            return res.status(200).send(data)
        })
        .catch(err => {
            console.log(err)
            res.status(400).send(err)
        })
}

exports.readList = function (req, res) {
    chuandaura.findAll({
        where: {
            ma_monhoc: req.params.mamh
        },
        order: [
            ['id', 'ASC']
        ]
    })
        .then(data => {
            data = data.map(cdr => cdr.id)
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Them chuan dau ra */
exports.create = async function (req, res) {
    const cdr_cdio = req.body.cdio.map(_cdio => ({
        ma_monhoc: req.params.mamh,
        ma_cdr: req.body.cdr,
        ma_cdio: _cdio
    }))
    const t = await sequelize.transaction()
    try {
        await chuandaura.create({
            id: req.body.cdr,
            ma_monhoc: req.params.mamh,
            ma_muctieu: req.body.muctieu,
            mota: req.body.mota,
            chuandaura_cdio: cdr_cdio
        }, {
            transaction: t,
            include: {
                model: chuandaura_cdio,
                as: "chuandaura_cdio"
            }
        })
        await t.commit()
        res.sendStatus(200)
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

/* Sua chuan dau ra */
exports.update = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        await chuandaura_cdio.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                ma_cdr: req.params.cdr
            }
        })
        const cdr_cdioMoi = req.body.cdio.map(_cdio => {
            return ({
                ma_monhoc: req.params.mamh,
                ma_cdr: req.params.cdr,
                ma_cdio: _cdio
            })
        })
        await chuandaura_cdio.bulkCreate(cdr_cdioMoi)
        chuandaura.update({
            id: req.body.cdr,
            ma_monhoc: req.body.mamh,
            ma_muctieu: req.body.muctieu,
            mota: req.body.mota
        }, {
            where: {
                id: req.params.cdr,
                ma_monhoc: req.params.mamh
            }
        })
        await t.commit()
        res.sendStatus(200)
    } catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

//Xoa
exports.delete = function (req, res) {
    chuandaura.destroy({
        where: {
            id: req.params.cdr,
            ma_monhoc: req.params.mamh
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(err)
        })
}