const LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
};

const isDevelopment = process.env.NODE_ENV === "development";

class Logger {
  static #logHistory = [];
  static #maxHistorySize = 1000; // Keep last 1000 logs in memory

  static #formatError(error) {
    if (error instanceof Error) {
      return {
        message: error.message,
        stack: error.stack,
        name: error.name,
      };
    }
    return error;
  }

  static #persistLog(level, message, error = null) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      error: error ? this.#formatError(error) : null,
    };

    // Add to history
    this.#logHistory.push(logEntry);
    if (this.#logHistory.length > this.#maxHistorySize) {
      this.#logHistory.shift(); // Remove oldest log
    }

    // In production, you would send this to your logging service
    if (!isDevelopment) {
      // Example: Send to logging service
      // this.#sendToLoggingService(logEntry);
    }
  }

  static log(level, message, error = null) {
    if (!isDevelopment && level === LOG_LEVELS.DEBUG) return;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    // Persist log before console output
    this.#persistLog(level, message, error);

    // Console output for development
    if (isDevelopment) {
      switch (level) {
        case LOG_LEVELS.ERROR:
          if (error) {
            console.error(logMessage, error);
          } else {
            console.error(logMessage);
          }
          break;
        case LOG_LEVELS.WARN:
          console.warn(logMessage);
          break;
        case LOG_LEVELS.INFO:
          console.info(logMessage);
          break;
        case LOG_LEVELS.DEBUG:
          console.debug(logMessage);
          break;
        default:
          console.log(logMessage);
      }
    }
  }

  static debug(message) {
    this.log(LOG_LEVELS.DEBUG, message);
  }

  static info(message) {
    this.log(LOG_LEVELS.INFO, message);
  }

  static warn(message) {
    this.log(LOG_LEVELS.WARN, message);
  }

  static error(message, error = null) {
    this.log(LOG_LEVELS.ERROR, message, error);
  }

  // Utility methods for debugging and monitoring
  static getLogHistory() {
    return [...this.#logHistory];
  }

  static clearLogHistory() {
    this.#logHistory = [];
  }

  static getErrorCount() {
    return this.#logHistory.filter((log) => log.level === LOG_LEVELS.ERROR)
      .length;
  }

  static getRecentErrors(limit = 10) {
    return this.#logHistory
      .filter((log) => log.level === LOG_LEVELS.ERROR)
      .slice(-limit);
  }
}

export default Logger;
