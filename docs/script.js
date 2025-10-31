// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "YOUR_ID",
  appId: "YOUR_APP_ID"
};

// ✅ Initialize Firebase
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// ✅ Open Form
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

// ✅ Close Form
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ✅ Submit Form
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
  alert("🎉 Your order is confirmed!");
  closeForm();
  document.getElementById("registerForm").reset();
  return false;
}

// ✅ ADMIN LOGIN SYSTEM
function checkAdminAccess() {
  const pass = prompt("🔐 Enter Admin Password to View All Bookings:");
  if (pass === "Khushi@123") {  // <-- Change password if you want
    document.getElementById("bookings").style.display = "block";
    loadBookings();
  } else if (pass !== null) {
    alert("❌ Wrong Password! Access Denied.");
  }
}

// ✅ Load bookings (Only when admin logged in)
function loadBookings() {
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = ""; // clear previous data
  bookingDB.on("child_added", function(snapshot) {
    const data = snapshot.val();
    const div = document.createElement("div");
    div.classList.add("bookingItem");
    div.innerHTML = `
      <strong>Name:</strong> ${data.name} <br>
      <strong>Email:</strong> ${data.email} <br>
      <strong>City:</strong> ${data.city} <br>
      <strong>Tickets:</strong> ${data.tickets} <br>
      <strong>Date:</strong> ${data.date}
    `;
    bookingList.prepend(div);
  });
}

// ✅ Hide All Bookings by default
window.onload = function() {
  document.getElementById("bookings").style.display = "none";
};
