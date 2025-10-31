function openPopup(city, price) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("city").value = city;
  document.getElementById("total").value = "₹" + price;
  document.getElementById("tickets").setAttribute("data-price", price);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

document.getElementById("tickets").addEventListener("input", function () {
  let price = this.getAttribute("data-price");
  let count = this.value;
  document.getElementById("total").value = "₹" + (price * count);
});

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const city = document.getElementById("city").value;
  const tickets = document.getElementById("tickets").value;
  const total = document.getElementById("total").value;

  alert(`🎉 Booking Confirmed!\n\nName: ${name}\nCity: ${city}\nTickets: ${tickets}\nTotal: ${total}`);

  closePopup();
  document.getElementById("bookingForm").reset();
});
