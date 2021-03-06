const test = require('tape');
const { PasswordGenerator } = require('../lib/PasswordGenerator');

test('Config test', (t) => {
  t.comment('------------------------------');
  t.plan(2);
  const defaultConfig = {
    enforce_length_limit: true,
    special_characters: "!#$%&'()*+,-./:;<=>?@[]^_{|}~",
    num_special_characters: 1,
    password_byte_length: 64,
    random_number_max: 99,
    min_password_length: 10,
    max_password_length: 64,
  };
  // Called statically
  t.deepEqual(PasswordGenerator.getDefaultConfig(), defaultConfig, true, 'Default config is as expected');
  // Checking on instantiated object
  const passGen = new PasswordGenerator();
  t.deepEqual(passGen.getConfig(), defaultConfig, 'Constructor sets default as expected');
  t.comment('------------------------------');
});
