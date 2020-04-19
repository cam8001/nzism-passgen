
const pg = require('./PasswordGenerator');

const passgen = {};

/**
 * Generate an NZISM compliant password.
 *
 * @return string
 */
passgen.generatePassword = () => {
  return pg.generatePassword();
};

/**
 * Validate an NZISM compliant password.
 *
 * @return Boolean
 */
passgen.validatePassword = (password) => {
  return pg.validatePassword(password);
};

module.exports = passgen;
