require('dotenv').config()
const {createLogger, transports} = require('winston')

const path = process.env.LOG_FOLDER
const logger = createLogger({
    level: 'info',
    transports: [
        new transports.File({filename: `${path}/orders.log`})
    ]
});

module.exports = logger;