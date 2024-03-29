const { WordList } = require('./WordList');

const MIN_PASS_LENGTH = 10;
const MAX_PASS_LENGTH = 64;

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
      special_characters: "!#$%&'()*+,-./:;<=>?@[]^_{|}~",
      // Number of special characters to include in password.
      num_special_characters: 1,
      // The level of entropy required for the password.
      password_byte_length: 64,
      // The maximum size of a random number used in the password.
      random_number_max: 99,
      // Minimum password length.
      min_password_length: MIN_PASS_LENGTH,
      // Maximum password length.
      max_password_length: MAX_PASS_LENGTH,
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
  getPassword(password = null) {
    // Allow to inject password, for testing.
    if (password == null) {
      password = this.generatePassword();
    }
    if (!this.isValidPassword(password)) {
      throw new Error('Password is invalid');
    }
    return password;
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
      if (password.length > this.config.max_password_length) {
        console.log(password, 'too long');
        return false;
      }
    }
    // Too short
    if (password.length < this.config.min_password_length) {
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
    const randomNumberMax = this.config.random_number_max;
    // A password consists of a single word, some random numbers, and some special characters.
    // Therefore, so that the password is not longer than the maximum length, the word used must
    // be short enough to accomodate the numbers and characters.
    // const nonWordCharacters = randomNumberMax.toString().length
    //   + this.config.num_special_characters;

    return (
      PasswordGenerator.capitalizeFirstLetter(this.getRandomWord())
        + PasswordGenerator.randomNumber(randomNumberMax)
        + this.getSpecialCharacters()
    );
  }

  /**
   * Return a string of random special characters.
   */
  getSpecialCharacters() {
    let specChars = '';
    for (let i = 0; i < this.config.num_special_characters; i += 1) {
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
    const specialCharacters = this.config.special_characters;
    const r = new RegExp(`[\\${specialCharacters.split('').join('\\')}]`);
    return r.test(password);
  }

  /**
   * Generates a random natural number between min and max.
   *
   * @param {number} max The maximum value of the random number.
   * @return number A random integer.
   */
  static randomNumber(max = Number.MAX_SAFE_INTEGER, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomSpecialCharacter() {
    const specialCharacters = this.config.special_characters;
    const stringLength = specialCharacters.length;
    const characterIndex = PasswordGenerator.randomNumber(stringLength) - 1;
    return specialCharacters[characterIndex];
  }

  static capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getRandomWord(minLength = MIN_PASS_LENGTH, maxLength = MAX_PASS_LENGTH, word = null) {
    if (word == null) {
      const w = new WordList();
      const words = w.getWords();
      word = words[PasswordGenerator.randomNumber(words.length)];
    }
    // Return the word if it meets our length requirements, otherwise grab another.
    const regex = new RegExp(`\\w{${minLength},${maxLength}}`);
    if (regex.test(word)) {
      return word;
    }
    return this.getRandomWord();
  }
}

module.exports = {
  PasswordGenerator,
};
