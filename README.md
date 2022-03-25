# Becoming the best testers that have ever tested testing.

## Set up

### Cloning the repo

- Please clone from the Clone branch if you would like a blank slate. From there you can follow the instructions below to get some basic tests to pass.

### What have I installed?

- `npm init -y`
- `npm install jest`
- In package.json change the value for the key test to equal `"jest"`

### How to set up test file

* We want to be using the jsdom environment and not the node environment and so to fix this, add this block to the very top of your test file:

```
/**
 * @jest-environment jsdom
 */
```

* Adding this line of code to the top of your test file, where the html variable points to the .html file you want to test

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
```
* These tests can all live within describe blocks that sit within the describe block above that runs the beforeEach to define the DOM

## Testing your functions

- Make sure you have a `module.exports` in the file where your function lives like so in index.js;

```
module.exports = {
    functionName
}
```

- If you have any EventListeners make sure they are wrapped in a `document.addEventListener('DOMContentLoaded', function () {}` otherwise they will not render in your tests. Example here;

```
document.addEventListener('DOMContentLoaded', function () {
    let buttonOne = document.getElementById('buttonOne');
    buttonOne.addEventListener('click', functionName)
})
```

- In your test file create a variable that requires this function from where it lives. Like so;

```
const javaFunctions = require('../js/index.js')
```

- Now you should be able to write tests on the functions that you've required. E.g. ;

```
describe('simple function', () => {
    test('simple function works', () => {
        javaFunctions.functionName()
        let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('Thanks for pressing the button')
        })
    })
})
```

* These tests can all live within describe blocks that sit within the describe block above that runs the beforeEach to define the DOM

## Running mock functions in jest

### Set Up

- for mocking functions you just need jest, for mocking api calls you need `npm install --save-dev jest-fetch-mock` but that will be outlined further down the README.
- As previous make sure any functions you are testing have been exported out of their home and required into the test file.

### Testing your function

- Let's use a function that uses an array and a call back to demonstrate.
- Try a function like 

```
function arrayFunc(arr, cb){
    arr.forEach(cb)
}

```
- One thing that would be useful to test would be that the function is called for each element in the array.
- So let's test this using jest mock like so;

```
describe('arrayFunc', () => {
    test('it runs the callback once for every element in the array', () => {
        const fakeCb = jest.fn(); 
        const testArr = ['this', 'that', 'the other'];
        <your-imported-variable>.arrayFunc(testArr, fakeCb);
        expect(fakeCb).toHaveBeenCalledTimes(3);
    })
})

```

- The above uses `jest.fn()` to create the mock function for the callback.
- We then create a fake array to test against and name the variable appropriately.
- You can then add these arguments into your function and have it run on the test array and use the fake callback.
- We are just testing to see if the function is being called for each element in the array so the fake callback doesn't need to do anything, it just needs to be called.

### This all should work! Have fun testing in the browser!



