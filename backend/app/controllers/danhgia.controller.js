var Models = require('../models')
const sequelize = require('../config/sequelize')

const danhgia_chuandaura = Models.danhgia_chuandaura
const danhgia = Models.danhgia

/* Xem danh gia */
exports.read = async function (req, res) {
    try {
        let data = await danhgia.findAll({
            where: {
                ma_monhoc: req.params.mamh
            },
            include: danhgia_chuandaura
        })
        data = data.map(danhgia => ({
            hinhthuc: danhgia.id,
            phanloai: danhgia.phanloai,
            noidung: danhgia.noidung,
            thoidiem: danhgia.thoidiem,
            congcu_kt: danhgia.congcu_kt,
            tile: danhgia.tile,
            chuandaura: danhgia.danhgia_chuandauras.map(cdr => cdr.ma_cdr)
        }))
        return res.status(200).send(data)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

/* Tao danh gia */
exports.create = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        const chuandaura = req.body.chuandaura.map(cdr => ({
            ma_cdr: cdr,
            ma_monhoc: req.params.mamh,
            ma_danhgia: req.body.hinhthuc
        }))
        await danhgia.create({
            phanloai: req.body.phanloai,
            id: req.body.hinhthuc,
            noidung: req.body.noidung,
            thoidiem: req.body.thoidiem,
            congcu_kt: req.body.congcu_kt,
            tile: req.body.tile,
            ma_monhoc: req.params.mamh
        })
        await danhgia_chuandaura.bulkCreate(chuandaura)
        await t.commit()
        res.sendStatus(200);
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}

/* Chinh sua */
exports.update = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        await danhgia_chuandaura.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                ma_danhgia: req.body.hinhthuc
            }
        })
        const cdr_moi = req.body.chuandaura.map(cdr => {
            return ({
                ma_cdr: cdr,
                ma_monhoc: req.params.mamh,
                ma_danhgia: req.body.hinhthuc
            })
        })
        await danhgia_chuandaura.bulkCreate(cdr_moi)
        //
        await danhgia.update({
            phanloai: req.body.phanloai,
            id: req.body.hinhthuc,
            noidung: req.body.noidung,
            thoidiem: req.body.thoidiem,
            congcu_kt: req.body.congcu_kt,
            tile: req.body.tile,
            ma_monhoc: req.params.mamh
        }, {
            where: {
                ma_monhoc: req.params.mamh,
                id: req.body.hinhthuc
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

//
exports.delete = async function (req, res) {
    const t = await sequelize.transaction()
    try {
        await danhgia_chuandaura.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                ma_danhgia: req.params.hinhthuc.replace('_', "#")
            }
        })
        await danhgia.destroy({
            where: {
                ma_monhoc: req.params.mamh,
                id: req.params.hinhthuc.replace('_', "#")
            }
        })
        await t.commit()
        return res.sendStatus(200)
    }
    catch (err) {
        await t.rollback();
        res.status(500).send(err);
    }
}