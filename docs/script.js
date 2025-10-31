import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQcex7SCBZVv8UBLfvwqvxzZIQ58JXQw",
  authDomain: "world-jouney-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-jouney-db",
  storageBucket: "world-jouney-db.appspot.com",
  messagingSenderId: "744693716678",
  appId: "1:744693716678:web:9bb1c5b4dd78536a6e1e3e"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const bookingDB = ref(db, "bookings");

// Open Popup
window.openForm = function(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
};

// Close Popup
window.closeForm = function() {
  document.getElementById("popupForm").style.display = "none";
};

// Submit Booking
window.submitForm = function() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.getElementById("tickets").value;
  const date = document.getElementById("date").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("⚠️ Please fill all details!");
    return false;
  }

  push(bookingDB, { name, email, city, tickets, date })
    .then(() => {
      alert("🎉 Your order is confirmed!");
      document.getElementById("registerForm").reset();
      closeForm();
    })
    .catch((err) => alert("❌ Error: " + err.message));

  return false;
};

// Show all bookings (only for you)
const bookingList = document.getElementById("bookingList");
onChildAdded(bookingDB, (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.classList.add("bookingItem");
  div.innerHTML = `
    <strong>Name:</strong> ${data.name}<br>
    <strong>Email:</strong> ${data.email}<br>
    <strong>City:</strong> ${data.city}<br>
    <strong>Tickets:</strong> ${data.tickets}<br>
    <strong>Date:</strong> ${data.date}
  `;
  bookingList.prepend(div);
});
