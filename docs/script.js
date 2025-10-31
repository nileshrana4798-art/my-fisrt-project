import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQcex7SCBZVv8UBLfvw9m6e1Oqk6R7Pk",
  authDomain: "world-jouney-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com/",
  projectId: "world-jouney-db",
  storageBucket: "world-jouney-db.appspot.com",
  messagingSenderId: "895901108796",
  appId: "1:895901108796:web:baaf91db7d5577bce3e91d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const popupForm = document.getElementById("popupForm");
const bookingForm = document.getElementById("bookingForm");

window.openForm = function(cityName) {
  popupForm.style.display = "block";
  if (cityName) document.getElementById("city").value = cityName;
};

window.closeForm = function() {
  popupForm.style.display = "none";
};

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;
  const days = document.getElementById("days").value;

  const newBookingRef = push(ref(db, "bookings"));
  set(newBookingRef, {
    name,
    email,
    city,
    days,
    date: new Date().toLocaleString()
  }).then(() => {
    alert("✅ Your order is confirmed!");
    bookingForm.reset();
    closeForm();
  }).catch((error) => {
    alert("❌ Error: " + error);
  });
});
