export class CustomError extends Error {
  constructor(message, code = 'INTERNAL_ERROR', status = 500, data = {}) {
    super();
    this.message = message;
    this.code = code;
    this.status = status;
    this.data = data;
  }
}

export class UserSessionNotValidError extends CustomError {
  constructor(message = 'User session was not valid.') {
    super(message, 'USER_SESSION_NOT_VALID', 401);
  }
}

export class TooManyUserSessionsError extends CustomError {
  constructor(message = 'Too many user sessions found.') {
    super(message, 'TOO_MANY_USER_SESSIONS', 401);
  }
}

export class UserSessionNotFoundError extends CustomError {
  constructor(message = 'User session does not exist.') {
    super(message, 'USER_SESSION_NOT_FOUND', 401);
  }
}

export class InvalidTokenError extends CustomError {
  constructor(message = 'Jsonwebtoken is invalid.') {
    super(message, 'INVALID_TOKEN', 401);
  }
}

export class UserAccountNotFoundError extends CustomError {
  constructor(message = 'User account does not exist.') {
    super(message, 'USER_ACCOUNT_NOT_FOUND', 401);
  }
}

export class UserAccountValidationError extends CustomError {
  constructor(message = 'User account validation error.') {
    super(message, 'USER_ACCOUNT_VALIDATION_ERROR', 401);
  }
}

export class InvalidCredentialsError extends CustomError {
  constructor(message = 'Credentials were invalid.') {
    super(message, 'INVALID_CREDENTIALS', 401);
  }
}

export class ProductNotFoundError extends CustomError {
  constructor(message = 'Product does not exist.') {
    super(message, 'PRODUCT_NOT_FOUND', 401);
  }
}
