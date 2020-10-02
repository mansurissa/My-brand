const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
navLinks.addEventListener("click", () => navLinks.classList.toggle("open"));

const disableLoader = () => {
  document.querySelector(".loader-container").classList.add("disabled");
};
