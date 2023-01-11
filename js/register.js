  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  
  import { getDatabase, ref, set, update, child, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCB38tZI5slskcr5EHZhOBBTnlpc1JgQ9o",
    authDomain: "vexwebsite-6a4ee.firebaseapp.com",
    projectId: "vexwebsite-6a4ee",
    storageBucket: "vexwebsite-6a4ee.appspot.com",
    messagingSenderId: "846412076753",
    appId: "1:846412076753:web:1d2fb8c4e5b264ced7d7f0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//Initialize authentication
const auth = getAuth();

//Return instance of your app's FRD
const db = getDatabase(app);

// ---------------- Register New User --------------------------------//
document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;
  const password = document.getElementById('userPass').value;

  // Firebase will require a password of at least 6 characters

  // Validate user inputs
  if(!validation(firstName, lastName, email, password)){
    return;
  }

  // Create user account
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // Add user account info to realtime database
    // 'Set' will create a new reference or completely replace an existing one
    // each new user will be placed under the 'users' node
    set(ref(db, 'users/' + user.uid + '/accountInfo'), {
      uid: user.uid,    // save userID for home.js reference 
      email: email,
      password: encryptPass(password),
      firstName: firstName,
      lastName: lastName
      })
      .then (() => {
        //Data saved successfully
        alert('User Created Successfully');
      })
      .catch((error) => {
        alert(errorMessage)
      });
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
} 

// Password validation
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
let passwordInput = document.getElementById("userPass");

// When the user clicks on the password field, show the message box
passwordInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
passwordInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
passwordInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(passwordInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
}

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(passwordInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(passwordInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if(passwordInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null
}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password) {
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9_\-\.]+@ctemc\.org$/;

  if(isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || isEmptyorSpaces(email) || isEmptyorSpaces(password)){
    alert("Please complete all fields");
    return false;
  }

  if(!fNameRegex.test(firstName)){
    alert("First name must be letters only");
    return false;   
  }
  if(!lNameRegex.test(lastName)){
    alert("Last name must be letters only");
    return false;   
  }
  if(!emailRegex.test(email)){
    alert("Plase enter a valid email address");
    return false;   
  }
  return true;
}


// --------------- Password Encryption -------------------------------------//
function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password, password);
  return encrypted.toString();
}

function decryptPass(password){
  let decrypted = CryptoJS.AES.decrypt(password, password);
  return decrypted.toString();
}