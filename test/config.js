
var test = require('tape')
var pg = require('../lib/main');
const { PasswordGenerator } = require('../lib/PasswordGenerator');

test('Config test', function(t) {
  t.plan(2)
  const defaultConfig = {'enforce_length_limit' : true};
  // Called statically
  t.deepEqual(PasswordGenerator.getDefaultConfig(), defaultConfig, true, `Default config is as expected`);
  // Checking on instantiated object
  const passGen = new PasswordGenerator();
  t.deepEqual(passGen.getConfig(), defaultConfig, 'Constructor sets default as expected');

})