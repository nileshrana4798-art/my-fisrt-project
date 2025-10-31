function scrollToPlanner(city) {
  const plannerSection = document.getElementById("planner");
  plannerSection.scrollIntoView({ behavior: "smooth" });
  if (city) document.getElementById("city").value = city;
}

const tripForm = document.getElementById("tripForm");
tripForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("✅ Your order is confirmed! Thank you for planning your trip with us.");
  tripForm.reset();
});
