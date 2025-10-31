function openPopup(city, price) {
  document.getElementById('popup').style.display = 'flex';
  document.getElementById('city').value = city;
  document.getElementById('total').value = `₹${price}`;
  document.getElementById('tickets').oninput = function () {
    const total = this.value * price;
    document.getElementById('total').value = `₹${total}`;
  };
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('🎟️ Booking Confirmed! Thank you for choosing World Journey.');
  closePopup();
});
