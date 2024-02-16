let signedIn = false;
let users = JSON.parse(localStorage.getItem("users")) || [];

const validateSignIn = (email, password) => {
  return users.some(
    (user) => user.email === email && user.password === password
  );
};

document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (validateSignIn(email, password)) {
    signedIn = true;
    let loggedInUser = users.find((user) => user.email === email);
    console.log(loggedInUser)
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    console.log("Sign-in successful!");
    window.location.href = "../../home/home.html";
  } else {
    console.log("Invalid email or password. Please try again.");
  }
});

console.log(signedIn);
