const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

const config = require('../config/appConfig.json');
const logConfig = config.logs;
// Define the logger configuration

const logger = winston.createLogger({
  level: logConfig.mode, // Set the default logging level to info
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Include timestamp in logs
    winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
    // winston.format.simple() // Use the simple format for logs
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new DailyRotateFile({
        filename: logConfig.path,
        datePattern: 'YYYY-MM-DD_HH_mm_ss',
        zippedArchive: false,
        maxSize: logConfig.size, // Rotate when file size exceeds 20 MB
        maxFiles: logConfig.retantionPeriod, // Retain logs for 14 days
      }),
  ],
});



// If you want to log error messages at the info level as well
logger.error = function (message, ...args) {
  // Log the error message at the 'info' level
  logger.info(message, ...args);
  // Log the error message at the 'error' level
  winston.Logger.prototype.error.apply(this, arguments);
};

module.exports = logger;
