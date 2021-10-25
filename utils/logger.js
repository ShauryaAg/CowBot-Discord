const winston = require('winston')

// Configure logger settings
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
})

module.exports = { logger }