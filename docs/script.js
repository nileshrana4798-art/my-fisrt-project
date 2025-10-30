// Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// Open popup
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

// Close popup
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Submit form
function submitForm() {
  const name = document.querySelector("#registerForm input[type='text']").value;
  const email = document.querySelector("#registerForm input[type='email']").value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector("#registerForm input[type='number']").value;
  const date = document.querySelector("#registerForm input[type='date']").value;

  bookingDB.push({
    name: name,
    email: email,
    city: city,
    tickets: tickets,
    date: date
  });

  alert("🎉 Your order is confirmed! Have a great journey.");
  closeForm();
  document.getElementById("registerForm").reset();
  return false;
}
// Display bookings in real-time
const bookingList = document.getElementById("bookingList");

bookingDB.on("child_added", function(snapshot) {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.classList.add("bookingItem");
  div.innerHTML = `<strong>Name:</strong> ${data.name} <br> <strong>Email:</strong> ${data.email} <br> <strong>City:</strong> ${data.city} <br> <strong>Tickets:</strong> ${data.tickets} <br> <strong>Date:</strong> ${data.date}`;
  bookingList.prepend(div); // newest booking top pe show ho
});

