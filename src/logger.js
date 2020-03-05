const winston = require('winston');

module.exports = {
    logger: winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new winston.transports.Console()
        ]
    })
};
