This package attempts to provide an up-to-date library for generating and validating NZISM compliant passwords.

[![npm version](https://badge.fury.io/js/nzism-passgen.svg)](https://www.npmjs.com/package/nzism-passgen)

# Usage

```javascript
const pg = require('nzism-passgen')

// Get a compliant password
console.log(pg.generatePassword())

// Validate an existing password
const password = 'notcompliant'
const isCompliant = pg.validatePassword(password);
console.log(`Password "${password}" compliant:`, isCompliant);
```

The current version of the ISM can be found here: https://www.nzism.gcsb.govt.nz/ism-document

As of this writing, the most recent update to the ISM was in February 2020, v3.3.

# Password Standard

This standard has been derived from the NZISM, section 16.1.

As the standard defined there is not prescriptive, the rules below have been derived from the deprecated [NZ Government Authentication Standard](https://snapshot.ict.govt.nz/guidance-and-resources/standards-compliance/authentication-standards/password-standard/index.html)

- Minimum length of 10 characters
- Maximum length of 64 characters
- Mixed case
- A special character
- A number

