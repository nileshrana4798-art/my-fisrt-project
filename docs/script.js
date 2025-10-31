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
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// Admin password
const ADMIN_PASSWORD = "Khushi123";

// ---------------- City Info ----------------
const cityInfo = {
  "Paris": "The city of love and lights, full of romance and art.",
  "Tokyo": "Experience the future with Japan’s rich culture.",
  "Dubai": "Luxury and innovation in the desert city of dreams.",
  "New York": "The city that never sleeps, where dreams come true."
};

// ---------------- Form Functions ----------------
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
  document.getElementById("popupCityTitle").innerText = city;
  document.getElementById("popupCityDesc").innerText = cityInfo[city];
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Submit form
function submitForm() {
  const name = document.querySelector('#registerForm input[type="text"]').value;
  const email = document.querySelector('#registerForm input[type="email"]').value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector('#registerForm input[type="number"]').value;
  const date = document.querySelector('#registerForm input[type="date"]').value;

  if (!name || !email || !city || !tickets || !date) {
    alert("Please fill all fields!");
    return false;
  }

  const newBooking = { name, email, city, tickets, date, timestamp: new Date().toISOString() };

  bookingDB.push(newBooking, (error) => {
    if (error) alert("Booking failed! Try again.");
    else {
      alert("Booking successful!");
      document.getElementById("registerForm").reset();
      closeForm();
    }
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
  bookingList.innerHTML = "";

  bookingDB.on("value", (snapshot) => {
    bookingList.innerHTML = "";
    snapshot.forEach((child) => {
      const b = child.val();
      const div = document.createElement("div");
      div.className = "booking-item";
      div.innerHTML = `<strong>${b.name}</strong> (${b.email}) booked <strong>${b.tickets}</strong> ticket(s) for <strong>${b.city}</strong> on <strong>${b.date}</strong>`;
      bookingList.appendChild(div);
    });
  });
}
