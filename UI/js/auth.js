auth.onAuthStateChanged((user) => {
  if (user) {
  } else {
    location.href = "login.html";
  }
});
