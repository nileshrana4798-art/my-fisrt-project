// Smooth scroll for navigation and buttons
document.querySelectorAll('.nav-link, .hero-btn, .visit-btn').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = link.getAttribute('href') || '';
    let targetId = '';
    if (href.startsWith('#')) targetId = href.slice(1);
    if (link.classList.contains('visit-btn')) {
      // For Visit Us button, scroll to About section
      targetId = 'about';
    }
    if (targetId) {
      e.preventDefault();
      const target = document.getElementById(targetId);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      }
      // Set active link in nav-menu
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if (link.classList.contains('nav-link')) link.classList.add('active');
    }
  });
});

// Popup booking form logic
const popupBg = document.getElementById('popup-bg');
const popupForm = document.getElementById('popup-form');
const popupClose = document.getElementById('popup-close');
const bookingForm = document.getElementById('booking-form');
const selectedCityInput = document.getElementById('selectedCity');

// Open popup on Book Ticket click
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    const card = btn.closest('.destination-card');
    if (card) {
      const city = card.getAttribute('data-city');
      selectedCityInput.value = city;
    } else {
      selectedCityInput.value = '';
    }
    popupBg.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

// Close popup
popupClose.addEventListener('click', function() {
  popupBg.style.display = 'none';
  document.body.style.overflow = '';
});
popupBg.addEventListener('click', function(e) {
  if (e.target === popupBg) {
    popupBg.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Confirm booking
bookingForm.addEventListener('submit', function(e) {
  e.preventDefault();
  popupBg.style.display = 'none';
  document.body.style.overflow = '';
  setTimeout(() => {
    alert("🎉 Your order is confirmed! Have a wonderful trip.");
  }, 200);
  bookingForm.reset();
});

// Contact form handler
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  setTimeout(() => {
    alert("Thank you for contacting World Journey! We'll reply soon.");
  }, 200);
  this.reset();
});

// Highlight nav-link on scroll
const sections = ['home','destinations','about','contact'];
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 80;
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        if (document.querySelector(`.nav-link[href="#${id}"]`))
          document.querySelector(`.nav-link[href="#${id}"]`).classList.add('active');
      }
    }
  });
});
