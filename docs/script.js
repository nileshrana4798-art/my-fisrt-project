// Open popup with selected city
function openPopup(cityName) {
  document.getElementById("popupForm").style.display = "flex";
  const cityDropdown = document.getElementById("city");
  if (cityName) cityDropdown.value = cityName;
  else cityDropdown.value = "";
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
