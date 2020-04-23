const test = require('tape');
const pg = require('../lib/main');

test('Generate test', (t) => {
  t.comment('------------------------------');
  t.plan(1);
  const pass = pg.generatePassword();
  t.equal(pg.validatePassword(pass), true, `Autogenerated password ${pass} is NZISM compliant`);
  t.comment('------------------------------');
});
