// Open popup with selected city
function openPopup(cityName) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("city").value = cityName || "";
}

// Close popup
function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

// Handle booking form submit
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("✅ Your order is confirmed! Thank you for booking with World Journey.");
  document.getElementById("popupForm").style.display = "none";
  this.reset();
});
