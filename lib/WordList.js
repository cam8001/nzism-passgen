class WordList {
  constructor() {
    this.config = WordList.getDefaultConfig();
    this.words = this.loadWordsFile();
  }

  static getDefaultConfig() {
    const config = {
      number_letters: 26,
    };
    return config;
  }

  getWords() {
    return this.words;
  }

  loadWordsFile() {
    const fileList = this.generateWordFilesList();
    const filename = fileList[Math.floor((Math.random() * this.config.number_letters))];
    const words = require(`../words/${filename}`);
    return words;
  }

  /**
   * Return a list of all the available words files.
   * Our build script will generate 100 files with the naming format
   * words-ab.json, words-ac.json, etc.
   */
  generateWordFilesList() {
    const aLetterCode = 'a'.charCodeAt();

    const fileList = [];
    let fileSuffix = '';

    for (let i = 0; i < this.config.number_letters; i += 1) {
      const letterCodeOffset = i % this.config.number_letters;
      fileSuffix = String.fromCharCode(aLetterCode + letterCodeOffset);
      fileList.push(`words-a${fileSuffix}.json`);
    }

    return fileList;
  }
}

module.exports = {
  WordList,
};
