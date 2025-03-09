export class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      error: {
        message: this.message,
      },
    };
  }
}

export const SuccessHandler = (res, message, details) => {
  res.status(200).json({
    success: true,
    message: message,
    details: details,
  });
};
