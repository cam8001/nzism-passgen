const test = require('tape');
const pg = require('../lib/main');
const pgLib  = require('../lib/PasswordGenerator');

test('Generate test', (t) => {
  t.comment('------------------------------');
  t.plan(3);

  const pass1 = pg.generatePassword();
  t.equal(pg.validatePassword(pass1), true, `Autogenerated password ${pass1} is NZISM compliant`);
  const passgen = new pgLib.PasswordGenerator();

  const badpassword = 'password'
  const err = new Error('Password is invalid');
  t.throws(() => {passgen.getPassword(badpassword)}, err, 'Bad password throws exception');

  const rand1 = pgLib.PasswordGenerator.randomNumber();
  const rand2 = pgLib.PasswordGenerator.randomNumber();
  t.true(rand1 !== rand2, `Random number generator is random: ${rand1} different to ${rand2}`);

  t.comment('------------------------------');
});

test('Check minimum word length enforced in generation', (t) => {
  t.comment('------------------------------');
  t.plan(1);
  const passgen = new pgLib.PasswordGenerator();
  const shortPass = 's';
  const minLength = 7;
  const maxLength = 12;
  const pass = passgen.getRandomWord(minLength, maxLength, shortPass);

  t.equal((pass.length >= minLength), true, `Random word meets minimum length requirement: length \(${pass.length} chars\) more than min ${minLength} characters`);
  t.comment('------------------------------');
});
