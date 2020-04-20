const test = require('tape');
const pg = require('../lib/main');

test('Validate test', (t) => {
  t.plan(8);
  let pass = '';

  pass = 'badpass';
  t.equal(pg.validatePassword(pass), false, `${pass} is not valid`);

  pass = 'tooshort';
  t.equal(pg.validatePassword(pass), false, `${pass} is not valid (too short)`);

  pass = 'longenoughbutnocapital';
  t.equal(pg.validatePassword(pass), false, `${pass} is not valid (no capital)`);

  pass = 'Capitalbutnonumber';
  t.equal(pg.validatePassword(pass), false, `${pass} is not valid (no number)`);

  pass = 'CapitalNumberNoSpecialChar99';
  t.equal(pg.validatePassword(pass), false, `${pass} is not valid (no special character)`);

  pass = 'PasswordIsValid12$';
  t.equal(pg.validatePassword(pass), true, `${pass} should be NZISM compliant`);

  pass = '0123456789012345678901234567890123456789012345678901234567890123456789Aa#';
  t.equal(pg.validatePassword(pass), false, `${pass} is too long`);

  const config = { enforce_length_limit: false };
  t.equal(pg.validatePassword(pass, config), true, `Disabled length checking, ${pass} is ok`);
});
