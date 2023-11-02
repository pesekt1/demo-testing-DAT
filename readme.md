# testing demo:

## install jest:
- npm install jest --save-dev
- now visit this web site to set it up for ES6: https://babeljs.io/setup#installation
  - go to the info about jest and follow the instruction

## get started
- create your test file: for example lib.test.js
- start writing tests
- use the documentation:
  - https://jestjs.io/docs/getting-started
  - https://jestjs.io/docs/api

## settings
in package.json, you can add extra flags to your tests:
- coverage: jest --coverage
- continuously running tests: jest --watchAll

```
  "scripts": {
    "test": "jest --coverage --watchAll"
  },
```

## exercises
- test strings - greet function
- test arrays - getCurrencies
- test objects - getProduct
- test exceptions - registerUser
- ... test everything :-D 

