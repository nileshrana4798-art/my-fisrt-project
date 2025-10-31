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

// Popup controls
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}
function openAdmin() {
  document.getElementById("adminLogin").style.display = "flex";
}
function closeAdmin() {
  document.getElementById("adminLogin").style.display = "none";
}

// Submit form
function submitForm() {
  const name = document.querySelector("#registerForm input[type='text']").value;
  const email = document.querySelector("#registerForm input[type='email']").value;
  const city = document.getElementById("selectedCity").value;
  const tickets = document.querySelector("#registerForm input[type='number']").value;
  const date = document.querySelector("#registerForm input[type='date']").value;

  if (!name || !email || !city || !tickets || !date) {
    alert("⚠️ Please fill all details.");
    return false;
  }

  bookingDB.push({ name, email, city, tickets, date });
  alert("🎉 Your Order is Confirmed!");
  closeForm();
  document.getElementById("registerForm").reset();
  return false;
}

// Verify admin password
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

// Load bookings only for admin
function loadBookings() {
  const bookingList = document.getElementById("bookingList");
  bookingList.innerHTML = "";
  bookingDB.on("child_added", (snapshot) => {
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
}
