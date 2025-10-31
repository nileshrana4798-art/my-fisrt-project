// ---------------- Firebase Config ----------------
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-journey-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// Admin Password
const ADMIN_PASSWORD = "Khushi123";

// ---------------- Popup Form ----------------
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ---------------- Submit Booking ----------------
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("selectedCity").value;
  const tickets = document.getElementById("tickets").value;
  const date = document.getElementById("date").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("Please fill all fields!");
    return false;
  }

  const booking = { name, email, city, tickets, date, time: new Date().toLocaleString() };

  bookingDB.push(booking)
    .then(() => {
      alert("✅ Your booking is confirmed! Thank you for choosing World Journey.");
      document.getElementById("registerForm").reset();
      closeForm();
    })
    .catch((error) => {
      alert("❌ Booking failed! Please try again.");
      console.error(error);
    });

  return false;
}

// ---------------- Admin Bookings ----------------
function showAdminBookings() {
  const password = prompt("Enter Admin Password:");
  if (password !== ADMIN_PASSWORD) {
    alert("Wrong password!");
    return;
  }

  document.getElementById("bookings").style.display = "block";
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "<p>Loading bookings...</p>";

  bookingDB.on("value", (snapshot) => {
    bookingList.innerHTML = "";
    if (!snapshot.exists()) {
      bookingList.innerHTML = "<p>No bookings yet.</p>";
      return;
    }

    snapshot.forEach((childSnapshot) => {
      const b = childSnapshot.val();
      const div = document.createElement("div");
      div.className = "bookingItem";
      div.innerHTML = `
        <strong>${b.name}</strong> (${b.email}) booked <strong>${b.tickets}</strong> ticket(s)
        for <strong>${b.city}</strong> on <strong>${b.date}</strong> <br>
        <small>${b.time}</small>
      `;
      bookingList.appendChild(div);
    });
  });
}
