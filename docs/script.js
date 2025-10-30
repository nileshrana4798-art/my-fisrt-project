function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

function submitForm() {
  alert("🎉 Your order is confirmed! Have a great journey.");
  closeForm();
  return false;
}
// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-journey-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Firebase start
firebase.initializeApp(firebaseConfig);
const contactDB = firebase.database().ref("bookings");

// Open aur Close form
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Data save karna
function submitForm() {
  const name = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector("input[type='number']").value;
  const date = document.querySelector("input[type='date']").value;

  // Firebase me data save karna
  contactDB.push({
    name: name,
    email: email,
    city: city,
    tickets: tickets,
    date: date
  });

  alert("🎉 Your order is confirmed! Have a great journey.");
  closeForm();
  return false;
}

