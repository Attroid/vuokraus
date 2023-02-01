import { CustomError } from 'utils/customErrors';

export function errorHandler(error, _req, res, _next) {
  console.error(error);

  console.log('error.name', error.name);
  console.log('error.message', error.message);
  console.log('error.code', error.code);

  const isErrorSafeForClient = error instanceof CustomError;

  const clientError = isErrorSafeForClient
    ? (({ message, code, status, data }) => ({ message, code, status, data }))(
        error
      )
    : {
        message: 'Something went wrong, please contact our support.',
        code: 'INTERNAL_ERROR',
        status: 500,
        data: {},
      };

  res.status(clientError.status).json({ error: clientError });
}
