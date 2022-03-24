# Becoming the best testers that have ever tested testing.

## Set up

### What have I installed?

- `npm init -y`
- `npm install jest`
- In package.json change the value for the key test to equal `"jest"`

### How to set up test file

* We want to be using the jsdom environment and not the node environment and so to fix this add this block to the very top of your test file:

```
/**
 * @jest-environment jsdom
 */
```

* Adding this line of code to the top of your test file, where the html variable points to your .html file you want to test

```
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
```
* To make your test generate the mock html file before the tests run you must add them in a describe block like so

```
describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })
```

* You should now be able to create layout tests as a minimum, e.g. ;

```
test('it has a h1 title', () => {
        let h1 = document.querySelector('h1');
        expect(h1.textContent).toContain('Our Testing Practice');
    })
