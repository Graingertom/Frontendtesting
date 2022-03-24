/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
const javaFunctions = require('../js/index')

describe('index.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    })

    test('it has a h1 title', () => {
        let h1 = document.querySelector('h1');
        expect(h1.textContent).toContain('Our Testing Practice');
    })

    describe('simple function', () => {
        test('simple function works', ()=> {
            javaFunctions.functionName()
            let h1 = document.querySelector('h1')
            expect(h1.textContent).toContain('Thanks for pressing the button')
        })
    })
})
