const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
console.log(navLinks);

burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});
