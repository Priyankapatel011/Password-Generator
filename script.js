const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')


const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number : getRandomNumber,
    symbol : getRandomSymbol
}


clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove()
    alert('Password copied to clipboard');
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // console.log(hasLower, hasUpper, hasNumber, hasSymbol);

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)

})


function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    // console.log(typesCount);
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);            // remove false values
    // console.log(typesArr);

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]();
            // console.log(funcName);
            
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}


function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)    // 0 + 97 = 'a'
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)    // 0 + 65 = 'A'
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)    // 0 + 48 = 0 , 1 + 48 = 49 = 1
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*()<>?/';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

// console.log(getRandomLower());
// console.log(getRandomUpper());



