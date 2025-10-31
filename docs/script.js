// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-journey-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// ---------------- Admin Password ----------------
const ADMIN_PASSWORD = "Khushi123";

// ---------------- City Info ----------------
const cityInfo = {
  "Paris": "The city of love and lights, full of romance and art.",
  "Tokyo": "Experience the future with Japan’s rich culture.",
  "Dubai": "Luxury and innovation in the desert city of dreams.",
  "New York": "The city that never sleeps, where dreams come true."
};

// ---------------- Popup Form ----------------
function openForm(city) {
  const popup = document.getElementById("popupForm");
  popup.style.display = "flex";

  document.getElementById("selectedCity").value = city;
  document.getElementById("popupCityTitle").innerText = city;
  document.getElementById("popupCityDesc").innerText = cityInfo[city];
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ---------------- Submit Form ----------------
function submitForm() {
  const name = document.querySelector('#registerForm input[type="text"]').value.trim();
  const email = document.querySelector('#registerForm input[type="email"]').value.trim();
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector('#registerForm input[type="number"]').value;
  const date = document.querySelector('#registerForm input[type="date"]').value;

  if (!name || !email || !city || !tickets || !date) {
    alert("⚠️ Please fill all fields before confirming your booking!");
    return false;
  }

  // Booking object
  const newBooking = {
    name: name,
    email: email,
    city: city,
    tickets: tickets,
    date: date,
    createdAt: new Date().toLocaleString()
  };

  // Push data to Firebase
  bookingDB.push(newBooking)
    .then(() => {
      alert("✅ Your booking is confirmed!\nThank you for choosing World Journey 💛");
      document.getElementById("registerForm").reset();
      closeForm();
    })
    .catch((error) => {
      console.error("Error saving booking:", error);
      alert("❌ Something went wrong. Please try again later.");
    });

  return false; // Prevent form reload
}

// ---------------- Admin Section ----------------
function showAdminBookings() {
  const password = prompt("Enter Admin Password:");
  if (password !== ADMIN_PASSWORD) {
    alert("❌ Wrong password! Access denied.");
    return;
  }

  document.getElementById("bookings").style.display = "block";
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "<p>Loading bookings...</p>";

  bookingDB.on("value", (snapshot) => {
    bookingList.innerHTML = "";
    if (!snapshot.exists()) {
      bookingList.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    snapshot.forEach((child) => {
      const b = child.val();
      const div = document.createElement("div");
      div.className = "booking-item";
      div.innerHTML = `
        <strong>${b.name}</strong> (${b.email})<br>
        City: <strong>${b.city}</strong><br>
        Tickets: ${b.tickets}<br>
        Date: ${b.date}<br>
        <small>Booked on: ${b.createdAt}</small>
      `;
      bookingList.appendChild(div);
    });
  });
}
