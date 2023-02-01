import knex from 'database/knex';
import {
  UserAccountNotFoundError,
  UserAccountValidationError,
} from 'utils/customErrors';
import { hashPassword } from 'utils/passwordHashing';

const UserAccount = {
  /**
   * Find user account by username
   * @param {string} username
   * @returns {Object} user account
   *
   * @throws {UserAccountNotFoundError}
   */
  findByUsername: async function (username) {
    const userAccount = await knex('userAccount')
      .where('username', username)
      .select(['id', 'username'])
      .first();

    if (!userAccount) {
      throw new UserAccountNotFoundError();
    }

    return userAccount;
  },

  /**
   * Find user account by id
   * @param {number} userAccountId
   * @returns {Object} user account
   *
   * @throws {UserAccountNotFoundError}
   */
  findById: async function (userAccountId) {
    const userAccount = await knex('userAccount')
      .where('id', userAccountId)
      .select(['id', 'username'])
      .first();

    if (!userAccount) {
      throw new UserAccountNotFoundError();
    }

    return userAccount;
  },

  /**
   * Check availability of username
   * @param {string} username
   * @returns {boolean} was username available
   */
  checkUsernameAvailability: async function (username) {
    const rows = await knex('userAccount').where('username', username);

    return rows.length === 0;
  },

  /**
   * Create user account
   * @param {string} username
   * @param {string} password
   * @returns {Object} created user account
   *
   * @throws {UserAccountValidationError}
   */
  create: async function (username, password) {
    if (password.length < 7) {
      throw new UserAccountValidationError('Password is too weak.');
    }

    const isUsernameAvailable = await this.checkUsernameAvailability(username);

    if (isUsernameAvailable === false) {
      throw new UserAccountValidationError('Username already taken.');
    }

    const passwordHash = await hashPassword(password);

    const [createdUserAccount] = await knex('userAccount')
      .insert({
        username,
        passwordHash,
      })
      .returning(['id', 'username']);

    return createdUserAccount;
  },

  /**
   * Find password hash by user account id
   * @param {number} userAccountId
   * @returns {string} password hash
   *
   * @throws {UserAccountNotFoundError}
   */
  findPasswordHashById: async function (userAccountId) {
    const userAccount = await knex('userAccount')
      .where('id', userAccountId)
      .select('passwordHash')
      .first();

    if (!userAccount) {
      throw new UserAccountNotFoundError();
    }

    return userAccount.passwordHash;
  },
};

export default UserAccount;
