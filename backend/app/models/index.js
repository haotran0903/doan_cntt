const initModels = require('./init-models')
const sequelize = require('../config/sequelize')
const db = require('../config/db.config.json')

module.exports = initModels(
    sequelize
)