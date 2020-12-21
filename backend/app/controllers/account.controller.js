var jwt = require('jsonwebtoken')
var accountModel = require('../models').account

exports.login = async function (req, res) {
    const account = await accountModel.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    if (account) {
        const token = jwt.sign({
            username: account.username,
            role: account.role
        }, "SPKT")
        return res.cookie('jwtToken', token, {
            maxAge: 259200000,
            httpOnly: true,
            secure: false
        }).send({
            username: account.username,
            role: account.role
        })
    }
    else {
        return res.status(401).send({
            message: "Đăng nhập không thành công. Vui lòng thử lại!"
        })
    }
}

exports.logout = async function (req, res) {
    return res.clearCookie('jwtToken').sendStatus(200)
}

exports.verify = async function (req, res) {
    const user = req.user
    if (user) {
        return res.status(200).json({
            username: user.username,
            role: user.role
        })
    }
    return res.status(401).send("Vui lòng đăng nhập!")
}