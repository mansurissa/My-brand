const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
const startLoader = () => {
  document.querySelector('.loader-container').classList.remove('disabled');
};
const disableLoader = () => {
  document.querySelector('.loader-container').classList.add('disabled');
};
document.getElementById('subscribe_btn').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});
document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});
