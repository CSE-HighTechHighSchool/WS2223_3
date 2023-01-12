// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signOut }
  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { getDatabase, ref, set, update, child, get, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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

// ---------------------// Get reference values -----------------------------
let userLink = document.getElementById('userLink');   // user name for number
let signOutLink = document.getElementById('signOut'); // sign-out link
let welcome = document.getElementById('welcome');    // welcome header
let memberPhoto = document.getElementById('member-photo');  // member image
//let resetLink = document.getElementById('reset');     // reset input link
let currentUser = null;                               // initialize currentUser to null


// ----------------------- Get User's Name'Name ------------------------------
function getUserName() {
  // Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem('keepLoggedIn');

  // Grab uder information passed in from signIn.js
  if (keepLoggedIn == 'yes') {
    currentUser = JSON.parse(localStorage.getItem('user'));
  } else {
    currentUser = JSON.parse(sessionStorage.getItem('user'));
  }
}

function signOutUser() {
  sessionStorage.removeItem('user'); // clear session storage
  localStorage.removeItem('user');   // clear local storage
  localStorage.removeItem('keepLoggedIn');

  signOut(auth, db).then(() => {
    // Sign-out successful.
    window.location.href = 'register.html';
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

// Remove user info from local/session storage

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
// function setData(userID, org, name, base, rpm, wheelSize, wheelType, shooter, roller, expansion, auton, awp, notes){
//   // Must use brackets around variable names to use it as a key
//   set(ref(db, '/Organization/' + org + '/' + name), {
//     'Drive Base': base,
//     'RPM': rpm,
//     'Wheel Size': wheelSize,
//     'Wheel Type': wheelType,
//     'Shooter': shooter,
//     'Roller': roller,
//     'Expansion': expansion,
//     'Auton': auton,
//     'AWP': awp,
//     'Notes': notes
//   })
//   .then(() => {
//     alert('Data stored successfully.')
//   }).catch((error) => {
//     alert('There was an error. Error: ' + error)
//   });
//  }


// Set, Update, Get, Remove Temperature Data
function hideBox() {
  document.getElementById('base').style.display = 'none';
  document.getElementById('rpm').style.display = 'none';
  document.getElementById('wheelSize').style.display = 'none';
  document.getElementById('wheelType').style.display = 'none';
  document.getElementById('shooter').style.display = 'none';
  document.getElementById('roller').style.display = 'none';
  document.getElementById('expansion').style.display = 'none';
  document.getElementById('auton').style.display = 'none';
  document.getElementById('awp').style.display = 'none';
  document.getElementById('ccwm').style.display = 'none';
  document.getElementById('notes').style.display = 'none';
  document.getElementById('base-label').style.display = 'none';
  document.getElementById('rpm-label').style.display = 'none';
  document.getElementById('wheelSize-label').style.display = 'none';
  document.getElementById('wheelType-label').style.display = 'none';
  document.getElementById('shooter-label').style.display = 'none';
  document.getElementById('roller-label').style.display = 'none';
  document.getElementById('expansion-label').style.display = 'none';
  document.getElementById('auton-label').style.display = 'none';
  document.getElementById('awp-label').style.display = 'none';
  document.getElementById('ccwm-label').style.display = 'none';
  document.getElementById('notes-label').style.display = 'none';
}

function unhHideBox() {
  document.getElementById('base').style.display = 'inline-block';
  document.getElementById('rpm').style.display = 'inline-block';
  document.getElementById('wheelSize').style.display = 'inline-block';
  document.getElementById('wheelType').style.display = 'inline-block';
  document.getElementById('shooter').style.display = 'inline-block';
  document.getElementById('roller').style.display = 'inline-block';
  document.getElementById('expansion').style.display = 'inline-block';
  document.getElementById('auton').style.display = 'inline-block';
  document.getElementById('awp').style.display = 'inline-block';
  document.getElementById('ccwm').style.display = 'inline-block';
  document.getElementById('notes').style.display = 'inline-block';
  document.getElementById('base-label').style.display = 'inline-block';
  document.getElementById('rpm-label').style.display = 'inline-block';
  document.getElementById('wheelSize-label').style.display = 'inline-block';
  document.getElementById('wheelType-label').style.display = 'inline-block';
  document.getElementById('shooter-label').style.display = 'inline-block';
  document.getElementById('roller-label').style.display = 'inline-block';
  document.getElementById('expansion-label').style.display = 'inline-block';
  document.getElementById('auton-label').style.display = 'inline-block';
  document.getElementById('awp-label').style.display = 'inline-block';
  document.getElementById('ccwm-label').style.display = 'inline-block';
  document.getElementById('notes-label').style.display = 'inline-block';
}

// ----------------------Get a datum from FRD (single data point)---------------

async function getData(userID, org, name) {
  const dbref = ref(db); // firebase paramter to get a reference to the database

  //Provide the path thrugh the nodes
  let data = await get(child(dbref, '/Organization/' + org + '/' + name)).then((snapshot) => {
    if (snapshot.exists()) {
      //To fet set of data, use snapshot.val()
      return snapshot.val();
    } else {
      return null;
    }
  })
    .catch((error) => {
      alert("Unsuccessful, error" + error);
    });
  return data;
}

async function loadExistingData(userID, org, name) {
  let data = await getData(userID, org, name);
  if (data) {
    document.getElementById('base').value = data['Drive Base'];
    document.getElementById('rpm').value = data['RPM'];
    document.getElementById('wheelSize').value = data['Wheel Size'];
    document.getElementById('wheelType').value = data['Wheel Type'];
    document.getElementById('shooter').value = data['Shooter'];
    document.getElementById('roller').value = data['Roller'];
    document.getElementById('expansion').value = data['Expansion'];
    document.getElementById('auton').value = data['Auton'];
    document.getElementById('awp').value = data['AWP'];
    document.getElementById('ccwm').value = data['CCWM'];
    document.getElementById('notes').value = data['Notes'];
  }
  unhHideBox();
}

function inputData(userID, org, name, base, rpm, wheelSize, wheelType, shooter, roller, expansion, auton, awp, ccwm, notes) {
  // Must use brackets around variable names to use it as a key
  update(ref(db, '/Organization/' + org + '/' + name), {
    'Drive Base': base,
    'RPM': rpm,
    'Wheel Size': wheelSize,
    'Wheel Type': wheelType,
    'Shooter': shooter,
    'Roller': roller,
    'Expansion': expansion,
    'Auton': auton,
    'AWP': awp,
    'CCWM': ccwm,
    'Notes': notes
  })
    .then(() => {
      alert('Data inputted successfully.')
    }).catch((error) => {
      alert('There was an error. Error: ' + error)
    });
}

function getScore(ccwm, expansion) {
  let score = 1;
  score *= ccwm;  // ccwm
  score *= expansion;   // expansion
  return score;
}

function createChart(teams, scores) {
  const ctx = document.getElementById('scores-chart');
  ctx.style.display = 'block';
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: teams,
      datasets: [
        {
          label: 'Scores',
          data: scores,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,                   // Re-size based on screen size
      scales: {                           // x & y axes display options
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Teams',
            font: {
              size: 20
            },
          }
          },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Score',
            font: {
              size: 20
            },
          }
        }
      },
      plugins: {                          // title and legend display options
        title: {
          display: true,
          text: 'Team Scores',
          font: {
            size: 24
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  });
}

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph
async function getDataSet(userID) {
  const teams = [];
  const bases = [];
  const rpms = [];
  const wheelSizes = [];
  const wheelTypes = [];
  const shooters = [];
  const rollers = [];
  const expansions = [];
  const autons = [];
  const awps = [];
  const ccwms = [];
  const notes = [];
  const scores = [];
  const tbodyEl = document.getElementById('tbody-2'); // Select <tbody> from table

  const dbref = ref(db); // firbease paramter required for 'get'

  //Wait for all data to be pulled from the FRD
  //Provide the path thrugh the nodes to the data
  await get(child(dbref, '/Organization/')).then((snapshot) => {
    if (snapshot.exists()) {
      Object.keys(snapshot.val()).forEach(org => {
        Object.keys(snapshot.val()[org]).forEach(team => {
          let data = snapshot.val()[org][team];
          teams.push(org + team);
          bases.push(data['Drive Base']);
          rpms.push(data['RPM']);
          wheelSizes.push(data['Wheel Size']);
          wheelTypes.push(data['Wheel Type']);
          shooters.push(data['Shooter']);
          rollers.push(data['Roller']);
          expansions.push(data['Expansion']);
          autons.push(data['Auton']);
          awps.push(data['AWP']);
          ccwms.push(data['CCWM']);
          notes.push(data['Notes']);
          scores.push(getScore(data['CCWM'], data['Expansion']));
        })
      });
    } else {
      alert("No data found");
    }
  })
    .catch((error) => {
      alert("Unsuccessful, error" + error);
    });

  // Dynamically add the table rows ro HTML
  tbodyEl.innerHTML = ''; // Clear the table
  for (let i = 0; i < teams.length; i++) {
    addItemToTable(
      [
        teams[i],
        bases[i],
        rpms[i],
        wheelSizes[i],
        wheelTypes[i],
        shooters[i],
        rollers[i],
        expansions[i],
        autons[i],
        awps[i],
        ccwms[i],
        scores[i],
        notes[i]
      ],
      tbodyEl
    );
  }
  document.getElementById('data-table').style.display = 'block';

  createChart(teams, scores);
}

// Add a item to the table of data
function addItemToTable(teamData, tbody) {
  let tRow = document.createElement('tr');  // row

  teamData.forEach(datum => {
    let td = document.createElement('td'); // column
    td.innerHTML = datum;
    tRow.appendChild(td);
  });

  tbody.appendChild(tRow);
}


// -------------------------Delete a day's data from FRD ---------------------
function deleteData(userID, org, name) {
  remove(ref(db, '/Organization/' + org + '/' + name))
    .then(() => {
      alert('Data removed successfully.')
    })
    .catch((error) => {
      alert('There was an error. Error: ' + error)
    })
}



// --------------------------- Home Page Loading -----------------------------
window.onload = function () {
  // ---------------------------------- Set Welcome Message -------------------------
  getUserName();
  hideBox();
  if (currentUser == null) {
    memberPhoto.src = 'img/logo.png';
    welcome.innerText = '';

    userLink.innerHTML = currentUser.name;
    userLink.classList.replace("nav-link", "btn");
    userLink.classList.add("btn-primary");
    userLink.href = "register.html";

    signOutLink.innerHTML = "Sign In";
    signOutLink.classList.replace("nav-link", "btn");
    signOutLink.classList.add("btn-success");
    signOutLink.href = "signIn.html";

  }
  else {
    userLink.innerText = currentUser.firstName;
    welcome.innerText = `Welcome ${currentUser.firstName}`;
    if (currentUser.photoFilename) {
      memberPhoto.src = 'img/' + currentUser.photoFilename;
    } else {
      memberPhoto.src = 'img/logo.png';
    }
    userLink.classList.replace("btn", "nav-link");
    userLink.classList.add("btn-primary");
    userLink.href = "#";

    signOutLink.innerHTML = "Sign Out";
    signOutLink.classList.replace("btn", "nav-link");
    signOutLink.classList.add("btn-success");
    document.getElementById('signOut').onclick = function () {
      signOutUser();
    }
  }

  // Update data
  document.getElementById('update').onclick = function () {
    const org = document.getElementById('org').value;
    const name = document.getElementById('name').value;
    unhHideBox();
    const base = document.getElementById('base').value;
    const rpm = document.getElementById('rpm').value;
    const wheelSize = document.getElementById('wheelSize').value;
    const wheelType = document.getElementById('wheelType').value;
    const shooter = document.getElementById('shooter').value;
    const roller = document.getElementById('roller').value;
    const expansion = document.getElementById('expansion').value;
    const auton = document.getElementById('auton').value;
    const awp = document.getElementById('awp').value;
    const ccwm = document.getElementById('ccwm').value;
    const notes = document.getElementById('notes').value;
    const userID = currentUser.uid;
    inputData(userID, org, name, base, rpm, wheelSize, wheelType, shooter, roller, expansion, auton, awp, ccwm, notes);


  }

  document.getElementById('reset').onclick = function () {    //Resets the page once data has been inputted 
    window.location.href = "home.html";
  }

  

  // get a datum
  document.getElementById('load-existing').onclick = function () {   //Loads the existing data
    const org = document.getElementById('org').value;
    const name = document.getElementById('name').value;
    const userID = currentUser.uid;
    loadExistingData(userID, org, name);

  }
  // get a data set
  document.getElementById('get-dataset').onclick = function () {  //Gets a dataset from the database so that it can be displayed
    const userID = currentUser.uid;
    getDataSet(userID);
  };


  // Delete a day's data
  document.getElementById('delete').onclick = function () {   //Deletes a data point from the firebase
    const org = document.getElementById('orgDelete').value;
    const name = document.getElementById('nameDelete').value;
    const userID = currentUser.uid;
    deleteData(userID, org, name);

  };
}
