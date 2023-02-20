import { CustomError } from 'utils/customErrors';
import Auth from 'handlers/Auth';

export const authorizeUser = async (req, _res, next) => {
  const { userAgent } = req;
  const { authToken } = req.cookies;

  try {
    const user = await Auth.validateSession(authToken, userAgent);
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof CustomError) {
      throw new InsufficientPermissionsError();
    }

    throw error;
  }
};
