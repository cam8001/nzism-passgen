# NZISM Compliant Password Generator

This package attempts to provide an up-to-date library for generating and validating NZISM compliant passwords.

Example randomly generated passwords:

```
Reelection34#
Isolable68@
Aldermanic32%
Ratiocinate77@
```

[![npm version](https://badge.fury.io/js/nzism-passgen.svg)](https://www.npmjs.com/package/nzism-passgen)
[![Coverage Status](https://coveralls.io/repos/github/cam8001/nzism-passgen/badge.svg?branch=master)](https://coveralls.io/github/cam8001/nzism-passgen?branch=master)
[![Build Status](https://travis-ci.org/cam8001/nzism-passgen.svg?branch=master)](https://travis-ci.org/cam8001/nzism-passgen)

## Usage

```javascript
const pg = require('nzism-passgen');

// Get a compliant password
console.log(pg.generatePassword());

// Validate an existing password
const password = 'notcompliant';
const isCompliant = pg.validatePassword(password);
console.log(`Password "${password}" compliant:`, isCompliant);
```

## Installation

In your app:

`npm install nzism-passgen`

or

`yarn add nzism-passgen`

## Password Standard

This standard has been derived from the NZISM, section 16.1.

The current version of the ISM can be found here: https://www.nzism.gcsb.govt.nz/ism-document

As of this writing, the most recent update to the ISM was  February 2020, v3.3.

As the standard defined there is not prescriptive, the rules below have been derived from the deprecated [NZ Government Authentication Standard](https://snapshot.ict.govt.nz/guidance-and-resources/standards-compliance/authentication-standards/password-standard/index.html)

- Minimum length of 10 characters
- Maximum length of 64 characters
- Mixed case
- A special character
- A number

