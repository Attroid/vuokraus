import UserSession from './models/UserSession';
import { checkPassword } from 'utils/passwordHashing';
import { CustomError, InvalidCredentialsError } from 'utils/customErrors';
import JsonWebToken from './models/JsonWebToken';
import UserAccount from './models/UserAccount';

const Auth = {
  /**
   * Log user into system
   * @param {string} username
   * @param {string} password
   * @param {string} userAgent
   * @returns {Array<userAccount: Object, authToken: string>} authenticated user account and authToken
   *
   * @throws {UserAccountNotFoundError}
   * @throws {InvalidCredentialsError}
   */
  authenticate: async function (username, password, userAgent) {
    const userAccount = await UserAccount.findByUsername(username);

    const isPasswordCorrect = await this.validatePassword(
      userAccount.id,
      password
    );

    if (isPasswordCorrect === false) {
      throw new InvalidCredentialsError("Password didn't match");
    }

    const authToken = await UserSession.create(userAccount.id, userAgent);

    return [userAccount, authToken];
  },

  /**
   * Invalidate session
   * @param {string} authToken
   * @param {string} userAgent
   * @returns {boolean} whether operation was successful
   *
   * @throws {InvalidTokenError}
   */
  invalidateSession: function (authToken, userAgent) {
    return UserSession.invalidate(authToken, userAgent);
  },

  /**
   * Invalidate all sessions of user
   * @param {string} authToken
   * @param {string} userAgent
   * @returns {boolean} whether operation was successful
   *
   * @throws {InvalidTokenError}
   * @throws {TooManyUserSessionsError}
   * @throws {UserSessionNotFoundError}
   */
  invalidateSessions: function (authToken, userAgent) {
    return UserSession.invalidateMany(authToken, userAgent);
  },

  /**
   * Register user in system
   *
   * If registration is successful,
   * authenticate user for the first time
   * @param {string} username
   * @param {string} password
   * @param {string} userAgent
   * @returns {Array<user: Object, authToken: string>} authenticated user and authToken
   *
   * @throws {UserAccountValidationError}
   */
  register: async function (username, password, userAgent) {
    await UserAccount.create(username, password);
    return this.authenticate(username, password, userAgent);
  },

  /**
   * Check if password is correct
   * @param {number} userAccountId
   * @param {string} password
   * @returns {boolean} was password correct
   */
  validatePassword: async function (userAccountId, password) {
    try {
      const passwordHash = await UserAccount.findPasswordHashById(
        userAccountId
      );

      return await checkPassword(password, passwordHash);
    } catch (error) {
      if (error instanceof CustomError === false) {
        throw error;
      }

      return false;
    }
  },

  /**
   * Check validity of session
   * @param {string} authToken
   * @param {string} userAgent
   * @returns {{ authenticated: boolean, user: Object|null }}
   */
  validateSession: async function (authToken, userAgent) {
    try {
      const { uuid } = JsonWebToken.verify(authToken);

      const { userAccountId } = await UserSession.findOne({
        uuid,
        userAgent,
      });

      return UserAccount.findById(userAccountId);
    } catch (error) {
      if (error instanceof CustomError === false) {
        throw error;
      }

      return null;
    }
  },

  /**
   * Calculate session count of user account
   * @param {number} userAccountId
   * @returns {number} session count
   *
   * @throws {UserAccountNotFoundError}
   */
  sessionCount: async function (userAccountId) {
    return UserSession.count(userAccountId);
  },
};

export default Auth;
