/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

// adding jest-fetch-mock
global.fetch = require('jest-fetch-mock');

// require your functions
const javaFunctions = require('../js/index')

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        { fetch.resetMocks() }
    })

    describe('layout testing', () => {
        test('it has a h1 title', () => {
            let h1 = document.querySelector('h1');
            expect(h1.textContent).toContain('Our Testing Practice');
        })
    })

    describe('simple function', () => {
        test('simple function works', ()=> {
            javaFunctions.functionName()
            let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('Thanks for pressing the button')
        })
    })

    describe('arrFunc', () => {
        test('it runs the callback once for every element in the array', () => {
            const fakeCb = jest.fn(); 
            const testArr = ['this', 'that', 'the other'];
            javaFunctions.arrFunc(testArr, fakeCb);
            expect(fakeCb).toHaveBeenCalledTimes(3);
        })
    })

    describe('testing an api call', () => {
        test('it makes a call to the api', async () => {
            await javaFunctions.callApi()
            expect(fetch).toHaveBeenCalled()
        })
    })

})
