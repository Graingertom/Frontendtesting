document.addEventListener('DOMContentLoaded', function () {
    let buttonOne = document.getElementById('buttonOne');
    buttonOne.addEventListener('click', functionName)
})

function functionName () {
    let h1 = document.querySelector('h1')
    h1.textContent = "Thanks for pressing the button"
}

function arrFunc (arr, cb) {
    arr.forEach(cb);
}

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

module.exports = {
    functionName,
    arrFunc,
    callApi
}
