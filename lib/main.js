const { PasswordGenerator } = require('./PasswordGenerator');

const passgen = {};

const defaultConfig = PasswordGenerator.getDefaultConfig();
/**
 * Generate an NZISM compliant password.
 *
 * @param {Object} configuration - A dictionary of configuration keys.
 * @see PasswordGenerator::defaultConfig().
 * @return {string} password
 */
passgen.generatePassword = (config = defaultConfig) => {
  const pg = new PasswordGenerator(config);
  return pg.getPassword();
};

/**
 * Validate an NZISM compliant password.
 *
 * @return Boolean
 */
passgen.validatePassword = (password, config = defaultConfig) => {
  const pg = new PasswordGenerator(config);
  return pg.isValidPassword(password);
};

module.exports = passgen;
