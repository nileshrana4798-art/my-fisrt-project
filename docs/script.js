import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBQcex7SCBZVv8UBLfvwYoz-4kEStcbpS1s",
  authDomain: "world-jouney-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com/",
  projectId: "world-jouney-db",
  storageBucket: "world-jouney-db.appspot.com",
  messagingSenderId: "633017560534",
  appId: "1:633017560534:web:98d4a5d178e9b8b967c2d2"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Elements
const popup = document.getElementById("popupForm");
const visitBtns = document.querySelectorAll(".visitBtn");
const closePopup = document.getElementById("closePopup");
const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

// 🔹 Open popup when clicking Visit Now
visitBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    popup.style.display = "flex";
    document.getElementById("city").value = btn.dataset.city;
  });
});

// 🔹 Close popup
closePopup.addEventListener("click", () => {
  popup.style.display = "none";
  message.textContent = "";
});

// 🔹 Form Submit
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();

  if (name && email && city) {
    const bookingRef = ref(db, "bookings");
    const newBooking = push(bookingRef);
    set(newBooking, {
      name,
      email,
      city,
      date: new Date().toLocaleString()
    })
    .then(() => {
      message.textContent = "✅ Your order is confirmed!";
      bookingForm.reset();
    })
    .catch(() => {
      message.textContent = "❌ Something went wrong!";
    });
  }
});
