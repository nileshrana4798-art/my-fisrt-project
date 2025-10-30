// Popup functionality
const popup = document.getElementById("popupForm");
const closeBtn = document.querySelector(".close");
const bookButtons = document.querySelectorAll(".book");
const bookingForm = document.getElementById("bookingForm");
const cityInput = document.getElementById("city");

bookButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const city = btn.closest(".card").getAttribute("data-city");
    cityInput.value = city;
    popup.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("🎉 Your order is confirmed! Have a great journey.");
  popup.style.display = "none";
  bookingForm.reset();
});
