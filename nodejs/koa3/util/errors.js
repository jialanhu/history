export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export class NotFoundError extends ApiError {
  constructor(message) {
    super(message, 404);
  }
}

export class ConflictError extends ApiError {
  constructor(message) {
    super(message, 409);
  }
}
