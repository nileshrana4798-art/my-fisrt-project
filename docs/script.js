import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// ✅ Firebase Config (use your real config here)
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
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const bookingDB = ref(db, "bookings");

// 🧳 Open Form
window.openForm = function(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city || "";
};

// 🧾 Close Form
window.closeForm = function() {
  document.getElementById("popupForm").style.display = "none";
};

// ✅ Submit Form
window.submitForm = function() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("selectedCity").value;
  const tickets = document.getElementById("tickets").value;
  const date = document.getElementById("date").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("Please fill all fields!");
    return false;
  }

  push(bookingDB, {
    name,
    email,
    city,
    tickets,
    date
  });

  alert(`🎉 Your order is confirmed!\n\nName: ${name}\nEmail: ${email}`);
  document.getElementById("registerForm").reset();
  closeForm();
  return false;
};

// 👩‍💼 Admin Access
const adminPassword = "admin123"; // change this
window.onload = function() {
  const pass = prompt("Enter admin password to see all bookings (or Cancel to skip):");
  if (pass === adminPassword) {
    document.getElementById("adminSection").classList.remove("hidden");
  }
};

// 👀 Real-time Booking Display
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
