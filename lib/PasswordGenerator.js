const niceware = require('niceware');

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
      special_characters: "!#$%&'()*+,-./:;<=>?@[]^_`{|}~",
      // Number of special characters to include in password.
      num_special_characters: 1,
      // The level of entropy required for the password.
      password_byte_length: 64,
      // The maximum size of a random number used in the password.
      random_number_max: 99,
      // Minimum password length.
      min_password_length: 10,
      // Maximum password length.
      max_password_length: 64,
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
      if (password.length > this.getConfig().max_password_length) {
        console.log(password, 'too long');
        return false;
      }
    }
    // Too short
    if (password.length < this.getConfig().min_password_length) {
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
    if (!this.hasSpecialCharacters(password)) {
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
    const passphrase = this.getWordList();
    const randomNumberMax = this.getConfig().random_number_max;
    // A password consists of a single word, some random numbers, and some special characters.
    // Therefore, so that the password is not longer than the maximum length, the word used must
    // be short enough to accomodate the numbers and characters.
    const nonWordCharacters = randomNumberMax.toString().length
      + this.getConfig().num_special_characters;
    // Find the first word
    let word = null;
    while (word === null) {
      for (let i = 0; i < passphrase.length; i += 1) {
        const w = passphrase[i];
        if (
          // Is this word long enough?
          w.length >= (this.getConfig().min_password_length - nonWordCharacters + 1)
          // Is this word too long?
          && w.length <= (this.getConfig().max_password_length - nonWordCharacters)
        ) {
          word = w;
          break;
        }
      }
    }

    return (
      PasswordGenerator.capitalizeFirstLetter(word)
        + PasswordGenerator.randomNumber(randomNumberMax)
        + this.getSpecialCharacters()
    );
  }

  /**
   * Return a string of random special characters.
   */
  getSpecialCharacters() {
    let specChars = '';
    for (let i = 0; i < this.getConfig().num_special_characters; i += 1) {
      specChars += this.randomSpecialCharacter();
    }
    return specChars;
  }

  /**
   * Checks if a string has special characters in it.
   *
   * @param {String} password String to check.
   * @return {Boolean} true if has special characters, false if not.
   */
  hasSpecialCharacters(password) {
    // Escape all the characters so they're not interpreted as regex operators.
    const specialCharacters = this.getConfig().special_characters;
    const r = new RegExp(`[\\${specialCharacters.split('').join('\\')}]`);
    return r.test(password);
  }

  /**
   * Generate a list of words.
   *
   * @return array
   */
  getWordList() {
    return niceware.generatePassphrase(this.getConfig().password_byte_length);
  }

  /**
   * Generates a random integer.
   *
   * @param {number} max The maximum value of the random number.
   * @return number A random integer.
   */
  static randomNumber(max) {
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
