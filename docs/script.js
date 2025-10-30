function openForm(city) {
  document.getElementById("popupForm").style.display = "flex";
  document.getElementById("selectedCity").value = city;
}

function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}

function submitForm() {
  alert("🎉 Your order is confirmed! Have a great journey.");
  closeForm();
  return false;
}
