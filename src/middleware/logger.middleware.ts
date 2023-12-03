import winston from "winston";
import winstonLogger from "express-winston";

export const requestLogger = winstonLogger.logger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/request.log' }),
  ],
});

export const errorLogger = winstonLogger.errorLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});
