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

## Running mock api calls in jest

### Set up

- Firstly, ensure you have installed jest-fetch-mock by running `npm install --save-dev jest-fetch-mock` on your client side, there is also a `fetch-mock-jest` so don't mix them up!
- To run this test I first created a server side with a simple API, this is given to you in the clone repo.
- Also make sure when you create your api you have these installed on your server side;

```
npm install express
npm install body-parser
npm install cors
```

- Then in your test file make sure you have this line of code;

```
global.fetch = require('jest-fetch-mock');
```

- Also, you want to make sure your start point is the same for each test so place a `beforeEach` to clear out the mocks like this;

```
beforeEach(() => { fetch.resetMocks() })
```

- This can be placed just under the describe line similar to the html import from the beginning.

### Running your tests

- A good starting point would be to test if the api is being called. Again, a reminder that every function you test needs to be exported and then imported into your test file. So an example of my function making the api call would be;

```
async function callApi () {
    try {
        const response = await fetch(`http://localhost:3000/data`)
        const data = await response.json()
        console.log(data)    
        return data
    } catch (err) {
        console.warn(err)
    }
}
```
- Now we can write a test just to see if the api has been called.
- The main thing that might catch you out is that your test function needs to be an async await function the same as the one above. Like so;

```
 describe('testing an api call', () => {
        test('it makes a call to the api', async () => {
            await javaFunctions.callApi()
            expect(fetch).toHaveBeenCalled()
        })
    })
```

### This all should work! Have fun testing in the browser!



