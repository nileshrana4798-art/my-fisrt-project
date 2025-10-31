const popupForm = document.getElementById("popupForm");
const bookingForm = document.getElementById("bookingForm");

// Open popup form
function openForm(cityName) {
  popupForm.style.display = "block";
  document.getElementById("city").value = cityName;
}

// Close popup form
function closeForm() {
  popupForm.style.display = "none";
}

// On form submit
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Your order is confirmed!");
  bookingForm.reset();
  closeForm();
});
