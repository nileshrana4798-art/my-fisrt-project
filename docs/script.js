// Firebase setup
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// Open Register Form
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

// Close Register Form
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// Admin Login
function openAdmin() {
  document.getElementById("adminLogin").style.display = "flex";
}
function closeAdmin() {
  document.getElementById("adminLogin").style.display = "none";
}

// Submit Form
function submitForm() {
  const name = document.querySelector("#registerForm input[type='text']").value;
  const email = document.querySelector("#registerForm input[type='email']").value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector("#registerForm input[type='number']").value;
  const date = document.querySelector("#registerForm input[type='date']").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("⚠️ Please fill all fields!");
    return false;
  }

  bookingDB.push({ name, email, city, tickets, date });
  alert("🎉 Your Order is Confirmed!");
  closeForm();
  document.getElementById("registerForm").reset();
  return false;
}

// Verify Admin Password (only admin sees bookings)
function verifyAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "Khushi@123") {
    document.getElementById("bookings").style.display = "block";
    closeAdmin();
    loadBookings();
  } else {
    alert("❌ Incorrect Password");
  }
}

// Load Bookings (only for admin)
function loadBookings() {
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";
  bookingDB.on("child_added", (snap) => {
    const data = snap.val();
    const div = document.createElement("div");
    div.classList.add("bookingItem");
    div.innerHTML = `
      <b>Name:</b> ${data.name}<br>
      <b>Email:</b> ${data.email}<br>
      <b>City:</b> ${data.city}<br>
      <b>Tickets:</b> ${data.tickets}<br>
      <b>Date:</b> ${data.date}
    `;
    bookingList.prepend(div);
  });
}
