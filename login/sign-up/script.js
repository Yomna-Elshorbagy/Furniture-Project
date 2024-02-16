class User {
  constructor(name, email, password, isAdmin = false) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    if (!this.isAdmin) {
      this.cart = [];
      this.orderHistory = [];
    }
  }
}

let users = [];

const user = new User("user", "user@example.com", "secret", false);
users.push(user);

const admin = new User("admin", "admin@example.com", "secret", true);
users.push(admin);
localStorage.setItem("users", JSON.stringify(users));

console.log(users);
const validateEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  );
};

const validateName = (name) => {
  return /^[a-z ,.'-]+$/i.test(String(name).toLowerCase());
};
document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let newUserName = document.getElementById("name").value;
    let newUserEmail = document.getElementById("email").value;
    let newUserPassword = document.getElementById("password").value;

    let newUserNmaeValidation = validateName(newUserName);
    let newUserEmailValidation = validateEmail(newUserEmail);

    try {
      if (newUserNmaeValidation && newUserEmailValidation && newUserPassword) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const newUser = new User(newUserName, newUserEmail, newUserPassword);
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));
        console.log("User signed up successfully!");
        window.location.href = "../../home/home.html";
      } else {
        throw new Error(
          "Invalid input. Please check your name, email, and password."
        );
      }
    } catch (e) {
      console.log(e);
    }
  });
