var Models = require('../models')

const muctieu = Models.muctieu
const chuandaura = Models.chuandaura
const chuandaura_cdio = Models.chuandaura_cdio
const monhoc = Models.muctieu

/* Lay thong tin muc tieu 1 mon hoc */
exports.readAll = async function (req, res) {
    try {
        const muctieuData = await muctieu.findAll({
            where: {
                ma_monhoc: req.params.mamh
            }
        })
        const data = await Promise.all(muctieuData.map(async (muctieu) => {
            let cdr = await chuandaura.findAll({
                include: {
                    model: chuandaura_cdio,
                    as: "chuandaura_cdio",
                    where: {
                        ma_monhoc: req.params.mamh
                    }
                },
                where: {
                    ma_monhoc: req.params.mamh,
                    ma_muctieu: muctieu.id
                }
            })
            return {
                muctieu: muctieu.id,
                mota: muctieu.mota,
                cdr_ctdt: Array.from(new Set(cdr.map(
                    _cdr => _cdr.chuandaura_cdio.map(
                        _cdio => _cdio.ma_cdio).join(' ')).join(' ').split(' '))).sort().join(' ')
            }
        }))
        return res.status(200).send(data)
    }
    catch (err) {
        return res.status(500).send(err)
    }
}

exports.readList = function (req, res) {
    muctieu.findAll({
        where: {
            ma_monhoc: req.params.mamh
        },
        order: [
            ['id', 'ASC']
        ],
        attributes: ['id']
    })
        .then(data => {
            data = data.map(muctieu => muctieu.id)
            return res.status(200).send(data)
        })
        .catch(err => res.status(400).send(err))
}

/* Them muc tieu mon hoc */
exports.create = function (req, res) {
    muctieu.create({
        id: req.body.muctieu,
        ma_monhoc: req.params.mamh,
        mota: req.body.mota
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

/* Chinh sua muc tieu */
exports.update = function (req, res) {
    muctieu.update({
        id: req.body.muctieu,
        mota: req.body.mota
    }, {
        where: {
            id: req.params.muctieu,
            ma_monhoc: req.params.mamh
        }
    })
        .then(success => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}

//Xoa muc tieu
exports.delete = function (req, res) {
    muctieu.destroy({
        where: {
            id: req.params.muctieu,
            ma_monhoc: req.params.mamh
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
}