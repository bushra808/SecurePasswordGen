//selecting elements from the HTML page by their IDs
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
const lengthErrorEl = document.getElementById('lengthError');

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

    if (length < 4 || length > 20) {
      lengthErrorEl.textContent = "Please enter a valid length.";
      lengthErrorEl.style.display = "block";
      resultEl.innerText = "";
      return;
    } else {
      lengthErrorEl.style.display = "none";
    }
  
    const hasLower = lowercaseEl.checked; // Check if the user selected lowercase letters
    const hasUpper = uppercaseEl.checked; // Check if the user selected uppercase letters
    const hasNumber = numbersEl.checked; // Check if the user selected numbers
    const hasSymbol = symbolsEl.checked; // Check if the user selected symbols
  
    // Call the generatePassword function with the user-selected criteria and update the result element
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);

    const passwordStrength = getPasswordStrength(resultEl.innerText);
    setStrengthIndicator(passwordStrength);
  });

  function getPasswordStrength(password) {
    const length = password.length;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[^a-zA-Z\d]/.test(password);
  
    let strength = 0;
  
    // Assign points for each characteristic
    if (length >= 10) {
      strength += 2; // Good length
    }
    else if(length >= 8) {
      strength += 1; // Good length
    }
  
    if (hasLower || hasUpper) {
      strength += 1; 
    }
  
    if (hasNumber) {
      strength += 1; // Numbers present
    }
  
    if (hasSymbol) {
      strength += 1; // Symbols present
    }
  
    return strength;
  }
  
  



  function setStrengthIndicator(strength) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthIndicator = document.querySelector('.strength-indicator');
    const strengthTextValues = ['VERY WEAK', 'WEAK', 'OKAY', 'STRONG', 'VERY STRONG'];
    const strengthClass = ['very-weak', 'weak', 'okay', 'strong', 'very-strong'];
  
    if (strength === 0) {
      strengthIndicator.style.display = 'none';
    } else {
      strengthIndicator.style.display = 'block';
      strengthBar.style.width = `${strength * 20}%`;
      strengthBar.setAttribute('data-strength-text', strengthTextValues[strength - 1]);
      strengthIndicator.className = 'strength-indicator ' + strengthClass[strength - 1];
    }
  }
  
  
  
  

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
  
    // const strengthIndicator = document.getElementById('strength-bar');
    // strengthIndicator.innerText = getPasswordStrength(generatedPassword);
    
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
  
