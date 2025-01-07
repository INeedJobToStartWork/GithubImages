import { createLogger, format, transports } from "winston";

export const WinstonConfig = createLogger({
	level: process.env.NODE_ENV === "production" ? "info" : "debug",
	format: format.combine(
		format.timestamp({
			format: "YYYY-MM-DD HH:mm:ss"
		}),
		format.ms(),
		format.json()
	),
	transports: [
		new transports.Console({
			format: format.combine(
				format.colorize(),
				format.simple(),
				format.printf(({ level, message, timestamp, context, ms }) => {
					return `[${timestamp}] [${context}] ${level}: ${message} ${ms}`;
				})
			)
		}),
		new transports.File({
			filename: "logs/application.log",
			maxsize: 10 * 1024 * 1024,
			maxFiles: 5,
			tailable: true
		}),
		new transports.File({
			filename: "logs/error.log",
			level: "error",
			maxsize: 10 * 1024 * 1024,
			maxFiles: 5,
			tailable: true
		})
	],
	exitOnError: false
});
