document.addEventListener('DOMContentLoaded', function () {
    let buttonOne = document.getElementById('buttonOne');
    buttonOne.addEventListener('click', functionName)
})

function functionName () {
    let h1 = document.querySelector('h1')
    h1.textContent = "Thanks for pressing the button"
}

module.exports = {
    functionName
}
