import jwt from 'jsonwebtoken';
import { InvalidTokenError } from 'utils/customErrors';

const JsonWebToken = {
  /**
   * Decodes jwt
   * @param {String} token
   * @returns {Object} decoded token
   *
   * @throws {InvalidTokenError} Jsonwebtoken is invalid
   */
  verify: function (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw new InvalidTokenError();
    }
  },

  /**
   * Create jwt
   * @param {Object} object
   * @returns {string} created token
   */
  sign: function (object) {
    return jwt.sign(object, process.env.JWT_SECRET);
  },
};

export default JsonWebToken;
