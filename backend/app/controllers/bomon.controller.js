var Models = require('../models')

const bomon = Models.bomon

/* Lay thong tin tat ca bo mon */
exports.read = function (req, res) {
    bomon.findAll()
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(err => {
            return res.status(400).send(err)
        })
}

/* Chinh sua mo ta 1 bo mon */
exports.update = function (req, res) {
    bomon.update({
        id: req.body.mabomon,
        ten: req.body.ten,
        mota: req.body.mota
    }, {
        where: {
            id: req.params.mabomon
        }
    })
        .then(() => res.sendStatus(200))
        .catch(err => res.status(400).send(err))

}