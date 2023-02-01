import knex from 'database/knex';
import { v1 as uuidV1 } from 'uuid';
import {
  UserSessionNotFoundError,
  UserAccountNotFoundError,
  TooManyUserSessionsError,
} from 'utils/customErrors';
import JsonWebToken from './JsonWebToken';

const UserSession = {
  /**
   * Create user session
   * @param {number} userAccountId
   * @param {string} userAgent
   * @returns {string} authToken
   *
   * @throws {UserAccountNotFoundError}
   */
  create: async function (userAccountId, userAgent) {
    const userAccount = await knex('userAccount')
      .where('id', userAccountId)
      .first();

    if (!userAccount) {
      throw new UserAccountNotFoundError();
    }

    const [{ uuid }] = await knex('userSession')
      .insert({
        userAccountId,
        userAgent,
        uuid: uuidV1(),
      })
      .returning('uuid');

    return JsonWebToken.sign({ uuid });
  },

  /**
   * Calculate session count of user account
   * @param {number} userAccountId
   * @returns {number} session count
   *
   * @throws {UserAccountNotFoundError}
   */
  count: async function (userAccountId) {
    const userAccount = await knex('userAccount')
      .where('id', userAccountId)
      .first();

    if (!userAccount) {
      throw new UserAccountNotFoundError();
    }

    const { count } = await knex('userSession')
      .where('userAccountId', userAccountId)
      .count('id')
      .first();

    return Number(count);
  },

  /**
   * find user session by where clause
   * @param {Object} whereClause
   * @returns {Object} user session
   *
   * @throws {TooManyUserSessionsError}
   * @throws {UserSessionNotFoundError}
   */
  findOne: async function (whereClause) {
    const rows = await knex('userSession').where(whereClause).select('*');

    if (rows.length > 1) {
      throw new TooManyUserSessionsError();
    }

    const userSession = rows[0];

    if (!userSession) {
      throw new UserSessionNotFoundError();
    }

    return userSession;
  },

  /**
   * Invalidate single user session
   * @param {string} authToken
   * @param {string} userAgent
   * @return {boolean} was operation successful
   *
   * @throws {InvalidTokenError}
   */
  invalidate: async function (authToken, userAgent) {
    const { uuid } = JsonWebToken.verify(authToken);

    const deletedRows = await knex('userSession')
      .where({ uuid, userAgent })
      .del()
      .returning('id');

    return deletedRows.length === 1;
  },

  /**
   *
   * @param {string} authToken
   * @param {string} userAgent
   * @return {boolean} was operation successful
   *
   * @throws {InvalidTokenError}
   * @throws {TooManyUserSessionsError}
   * @throws {UserSessionNotFoundError}
   */
  invalidateMany: async function (authToken, userAgent) {
    const { uuid } = JsonWebToken.verify(authToken);

    const { userAccountId } = await this.findOne({ uuid, userAgent });

    const deletedRows = await knex('userSession')
      .where({ userAccountId })
      .del()
      .returning('id');

    return deletedRows.length > 0;
  },
};

export default UserSession;
