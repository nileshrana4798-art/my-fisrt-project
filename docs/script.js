let selectedCity = '';
let cityPrice = 0;

function openPopup(city, price) {
  selectedCity = city;
  cityPrice = price;
  document.getElementById('city').value = city;
  document.getElementById('total').value = `₹${price}`;
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

document.getElementById('tickets').addEventListener('input', function () {
  const tickets = parseInt(this.value);
  const total = cityPrice * tickets;
  document.getElementById('total').value = `₹${total}`;
});

document.getElementById('bookingForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert(`🎉 Your order is confirmed!\nEnjoy your trip to ${selectedCity} ✈️`);
  closePopup();
});
