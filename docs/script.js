// ✅ Firebase Config (apna config yaha daale)
const firebaseConfig = {
  apiKey: "AIzaSyBQcex7SCBZVv8UBLfvw0P3B1Yje0HZsr0",
  authDomain: "world-journey-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-journey-db",
  storageBucket: "world-journey-db.appspot.com",
  messagingSenderId: "1057320712341",
  appId: "1:1057320712341:web:3c4b6f56bff9828b3f7b73"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const bookingDB = firebase.database().ref("bookings");

// 🧳 Open Form
function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

// 🧾 Close Form
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

// ✅ Submit Form
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

  // Data Save to Firebase
  bookingDB.push({
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
}

// 👀 Real-time Booking Display
const bookingList = document.getElementById("bookingList");

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
