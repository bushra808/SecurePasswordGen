//selecting elements from the HTML page by their IDs
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');

const randomFunc = { //an object holding references to different functions
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

clipboard.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;
  
    if (!password) {
      return; // If there is no generated password, exit the function
    }
  
    textarea.value = password; // Set the textarea value to the generated password
    document.body.appendChild(textarea); // Append the textarea to the document
    textarea.select(); // Select the contents of the textarea
    document.execCommand('copy'); // Copy the selected text to the clipboard
    textarea.remove(); // Remove the textarea element from the document
    alert('Password copied to clipboard'); // Show an alert message to notify the user
  });
  

  generate.addEventListener('click', () => {
    const length = +lengthEl.value; // Get the user-selected password length as a number
    const hasLower = lowercaseEl.checked; // Check if the user selected lowercase letters
    const hasUpper = uppercaseEl.checked; // Check if the user selected uppercase letters
    const hasNumber = numbersEl.checked; // Check if the user selected numbers
    const hasSymbol = symbolsEl.checked; // Check if the user selected symbols
  
    // Call the generatePassword function with the user-selected criteria and update the result element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
  });
  

  function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    const typesCount = typesArr.length;
  
    if (typesCount === 0) {
      return '';
    }
  
    // Generate the password with random characters of different types
    for (let i = 0; i < length; i++) {
      const randomTypeIndex = Math.floor(Math.random() * typesCount);
      const funcName = Object.keys(typesArr[randomTypeIndex])[0];
      generatedPassword += randomFunc[funcName]();
    }
  
    return generatedPassword;
  }
  
  
  function getRandomLower() {
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % 26;
    // console.log(randomIndex);
    return String.fromCharCode(randomIndex + 97);
  }
  
  
  function getRandomUpper() {
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % 26;
    return String.fromCharCode(randomIndex + 65);
  }
  
  
  function getRandomNumber() {
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % 10;
    return randomIndex.toString();
  }
  
  
  function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    const randomBytes = new Uint8Array(1);
    crypto.getRandomValues(randomBytes);
    const randomIndex = randomBytes[0] % symbols.length;
    return symbols.charAt(randomIndex);
  }
  
