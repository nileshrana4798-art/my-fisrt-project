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

// Admin password
const ADMIN_PASSWORD = "Khushi123";

// City info for popup
const cityInfo = {
  "Paris": "The city of love and lights, full of romance and art.",
  "Tokyo": "Experience the future with Japan’s rich culture.",
  "Dubai": "Luxury and innovation in the desert city of dreams.",
  "New York": "The city that never sleeps, where dreams come true."
};

// Open form
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("popupCityTitle").innerText = city;
  document.getElementById("popupCityDesc").innerText = cityInfo[city];
  document.getElementById("selectedCity").value = city;
}

// Close form
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Submit form
function submitForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("selectedCity").value;
  const tickets = document.getElementById("tickets").value;
  const date = document.getElementById("date").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("⚠️ Please fill all fields!");
    return false;
  }

  const booking = {
    name,
    email,
    city,
    tickets,
    date,
    createdAt: new Date().toLocaleString()
  };

  bookingDB.push(booking)
    .then(() => {
      alert("✅ Your booking is confirmed!\nThank you for choosing World Journey 💛");
      document.getElementById("registerForm").reset();
      closeForm();
    })
    .catch((error) => {
      console.error(error);
      alert("❌ Failed to confirm booking. Try again!");
    });

  return false;
}

// Admin view bookings
function showAdminBookings() {
  const password = prompt("Enter Admin Password:");
  if (password !== ADMIN_PASSWORD) {
    alert("❌ Wrong password!");
    return;
  }

  document.getElementById("bookings").style.display = "block";
  const list = document.getElementById("bookingList");
  list.innerHTML = "<p>Loading bookings...</p>";

  bookingDB.on("value", (snapshot) => {
    list.innerHTML = "";
    if (!snapshot.exists()) {
      list.innerHTML = "<p>No bookings found.</p>";
      return;
    }

    snapshot.forEach((child) => {
      const b = child.val();
      const div = document.createElement("div");
      div.className = "bookingItem";
      div.innerHTML = `
        <strong>${b.name}</strong> (${b.email})<br>
        City: ${b.city}<br>
        Tickets: ${b.tickets}<br>
        Date: ${b.date}<br>
        <small>Booked on: ${b.createdAt}</small>
      `;
      list.appendChild(div);
    });
  });
}
