const niceware = require('niceware');

// The level of entropy required for the password.
const PASSWORD_BYTE_LENGTH = 64;
// The maximum size of a random number used in the password.
const RANDOM_NUMBER_MAX = 99;

// Number of special characters to include in password.
const NUM_SPECIAL_CHARACTERS = 1;

// Minimum password length.
const MIN_PASSWORD_LENGTH = 10;
// Maximum password length.
const MAX_PASSWORD_LENGTH = 64;

class PasswordGenerator {
  constructor(config = PasswordGenerator.getDefaultConfig()) {
    // Merge any passed-in config with the default config.
    // @see https://stackoverflow.com/a/171256
    this.config = { ...PasswordGenerator.getDefaultConfig(), ...config };
  }

  static getDefaultConfig() {
    return {
      // Whether or not to limit the length of passwords.
      enforce_length_limit: true,
      // List of special characters, taken from OWASP.
      // @see https://owasp.org/www-community/password-special-characters
      special_characters: '+$%*#@',
    };
  }

  getConfig() {
    return this.config;
  }

  enforceLengthLimit() {
    return this.config.enforce_length_limit;
  }

  /**
   * Return an NZISM compliant password.
   */
  getPassword() {
    const password = this.generatePassword();

    if (this.isValidPassword(password)) {
      return password;
    }
    // Failsafe to regenerate password if the last generated password is invalid.
    return this.getPassword();
  }

  /**
   * Checks whether a password is valid against NZISM standards.
   *
   * @param password
   *
   * @return Boolean
   */
  isValidPassword(password) {
    // Too long
    if (this.enforceLengthLimit()) {
      if (password.length > MAX_PASSWORD_LENGTH) {
        console.log(password, 'too long');
        return false;
      }
    }
    // Too short
    if (password.length < MIN_PASSWORD_LENGTH) {
      console.log(password, 'too short');
      return false;
    }
    // No capital letter
    if (/[A-Z]/.test(password) === false) {
      console.log(password, 'no capital');
      return false;
    }
    // No number
    if (/\d/.test(password) === false) {
      console.log(password, 'no number');
      return false;
    }
    // No special character
    // Escape all the characters so they're not interpreted as regex operators.
    const specialCharacters = this.getConfig().special_characters;
    const r = new RegExp(`[\\${specialCharacters.split('').join('\\')}]`);
    if (r.test(password) === false) {
      console.log(password, 'no special character');
      return false;
    }
    return true;
  }

  /**
   * Generate a password compliant with the NZISM.
   * @see getPassword() for validity criteria.
   *
   * @return string The password.
   */
  generatePassword() {
    const passphrase = PasswordGenerator.getWordList();
    // A password consists of a single word, some random numbers, and some special characters.
    // Therefore, so that the password is not longer than the maximum length, the word used must
    // be short enough to accomodate the numbers and characters.
    const nonWordCharacters = RANDOM_NUMBER_MAX.toString().length + NUM_SPECIAL_CHARACTERS;
    // Find the first word
    let word = null;
    while (word === null) {
      for (let i = 0; i < passphrase.length; i += 1) {
        const w = passphrase[i];
        if (
          // Is this password long enough?
          w.length >= (MIN_PASSWORD_LENGTH - nonWordCharacters + 1)
          && w.length <= (MAX_PASSWORD_LENGTH - nonWordCharacters)
        ) {
          word = w;
          break;
        }
      }
    }

    let specChars = '';
    for (let i = 0; i < NUM_SPECIAL_CHARACTERS; i += 1) {
      specChars += this.randomSpecialCharacter();
    }

    return PasswordGenerator.capitalizeFirstLetter(word) + PasswordGenerator.randomNumber() + specChars;
  }

  /**
   * Generate a list of words.
   *
   * @return array
   */
  static getWordList() {
    return niceware.generatePassphrase(PASSWORD_BYTE_LENGTH);
  }

  static randomNumber(max = RANDOM_NUMBER_MAX) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randomSpecialCharacter() {
    const specialCharacters = this.getConfig().special_characters;
    const stringLength = specialCharacters.length;
    const characterIndex = PasswordGenerator.randomNumber(stringLength);
    return specialCharacters.slice(characterIndex, characterIndex + 1);
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

module.exports = {
  PasswordGenerator,
};
