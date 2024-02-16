let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
console.log("Logged-in user:", loggedInUser);
let card_btn_user = document.getElementsByClassName("for_user");
let card_btn_admin = document.getElementsByClassName("for_admin");
console.log(loggedInUser);

if (loggedInUser.isAdmin == true) {
  for (let btn of card_btn_admin) {
    btn.style.display = "block";
  }
  for (let btn of card_btn_user) {
    btn.style.display = "none";
  }
}
if (loggedInUser.isAdmin == false) {
  for (let btn of card_btn_admin) {
    btn.style.display = "none";
  }
  for (let btn of card_btn_user) {
    btn.style.display = "block";
  }
}

let loginElement = document.getElementById("login");

if (Object.keys(loggedInUser).length !== 0) {
  loginElement.innerHTML = `Log out`;
  loginElement.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    location.reload();
  });
} else {
  loginElement.innerHTML = `Log In`;
  loginElement.addEventListener("click", function () {
    window.location.href = "http://127.0.0.1:5500/login/sign-in/index.html";
  });
}

// ------------------------
//fetch data from json file
let products_dom = document.getElementById("products");
console.log(products);
let allProd = [];
const addProductsToDom = () => {
  products_dom.innerHTML = "";

  if (allProd.length > 0) {
    allProd.forEach((prod,i) => {
      if(i<3){
        console.log(prod);
        let new_prod = document.createElement("div");
        new_prod.classList.add("item");
        new_prod.innerHTML = `
                  <img class="item_img" src="${prod.image}" alt="">
                  <div class="card_text">
                      <h4>${prod.name}</h4>
                      <div class="rating">
                          <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-regular fa-star"></i>
                          <i class="star fa-regular fa-star"></i>
                      </div>
                      <h3 class="price">${prod.price}</h3>
                      <span id="prod_code">code: ${prod.id}</span>
                  </div>
  
        `;
        products_dom.appendChild(new_prod);
      }
    });
  }
};
const getData = () => {
  fetch("../products.json")
    .then((d) => d.json())
    .then((d) => {
      allProd = d;
      addProductsToDom();
    });
};
getData();
