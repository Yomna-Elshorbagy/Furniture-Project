let card_btn_user = document.getElementsByClassName("for_user");
let card_btn_admin = document.getElementsByClassName("for_admin");
let add_prod_box = document.getElementById("add_box");
let add_prod_btn = document.getElementById("add_prod");

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};

console.log(loggedInUser);
if (!loggedInUser.isAdmin) {
  document.getElementById("add_prod").style.display = "none";
}

let loginElement = document.getElementById("login");

if (Object.keys(loggedInUser).length !== 0) {
  loginElement.innerHTML = `Log out`;
  loginElement.addEventListener("click", function () {
    localStorage.removeItem("loggedInUser");
    location.reload();
  })
} else if (Object.keys(loggedInUser).length === 0) {
  loginElement.innerHTML = `Log In`;
  loginElement.addEventListener("click", function () {
    window.location.href = "/login/sign-in/index.html";
  });
}
let products_dom = document.getElementById("products");
let allProd = [];
let displayedProducts = 9;
let productsToAdd = 9;

const deleteProduct = (productId) => {
  const index = allProd.findIndex((prod) => prod.id === productId);
  if (index !== -1) {
    allProd.splice(index, 1);
  }
  addProductsToDom();
};
// **************************
// edit product
const editProduct=(id)=>{
    target_prod=allProd.filter(p=>p.id==id)[0];
    console.log(target_prod)
    add_prod_box.innerHTML="";
    add_prod_box.classList.remove('hide');
    let edit_form=`
        <form onsubmit="edit(event , ${id})" class="edit">
            <label>name:</label>
            <input type="text" id="name" value=${target_prod.name}>
            <label>price:</label>
            <input type="text" id="price" value=${target_prod.price} id="">
            <label>category:</label>
            <input type="text" id="category" value=${target_prod.category} id="">
            <label for="description">description</label>
            <textarea id="description" id="description" rows="2" cols="30">${target_prod.description}</textarea>
            <label>image:</label>
            <input type="file" id="image" accept=".png, .jpg, .jpeg">
            <input type="submit" value="Edit">
            <input type="button" onclick="hide_box()" value="Cancel">
        </form>
    `
    add_prod_box.innerHTML=edit_form;
}
function edit(event , id){
    event.preventDefault();
    let name=event.target.querySelector("#name").value;
    let price=event.target.querySelector("#price").value;
    let description=event.target.querySelector("#description").value;
    let category=event.target.querySelector("#category").value;
    let image=event.target.querySelector("#image").value
              ? `../products_img/${event.target.querySelector("#image").files[0].name}`
              : "../products_img/img_not.jpg";
    let editProd={
      id:id,
      name:name,
      price:price,
      description:description,
      category:category,
      image:image
    }
    allProd.splice(id,1,editProd);
    addProductsToDom();
}
const addToCart = (productId) => {
  if (!loggedInUser.cart) {
    window.location.href = "/login/sign-in/index.html";
    return;
  }
  const alreadyInCart = loggedInUser.cart.some((item) => item.id === productId);

  if (!alreadyInCart) {
    const selectedProduct = allProd.find((prod) => prod.id === productId);
    loggedInUser.cart = [...loggedInUser.cart, selectedProduct];
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    console.log(loggedInUser.cart);
    prodCount();
  } else {
    alert("Product is already in the cart!");
  }
};


const addToWishlist = (productId) => {
  if (!loggedInUser.wishlist) {
    loggedInUser.wishlist = [];
  }

  const alreadyInWishlist = loggedInUser.wishlist.some((item) => item.id === productId);

  if (!alreadyInWishlist) {
    const selectedProduct = allProd.find((prod) => prod.id === productId);
    loggedInUser.wishlist = [...loggedInUser.wishlist, selectedProduct];
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    console.log(loggedInUser);
    wishlistCount();
  } else {
    alert("Product is already in the wishlist!");
  }
};




const prodCount=()=>{
  const prod_count=document.getElementById("prod_count");
  if(loggedInUser.cart){
    prod_count.innerHTML=loggedInUser.cart.length;
  }
  return;
}
prodCount()

const wishlistCount = () => {
  const wishlistCountElement = document.getElementById("wishlist_count");
  if (loggedInUser.wishlist) {
    wishlistCountElement.innerHTML = loggedInUser.wishlist.length;
  }
  return;
};

wishlistCount();

const addProductsToDom = (search_case=[]) => {
  products_dom.innerHTML = "";

  if (allProd.length > 0) {
    allProd.slice(0, displayedProducts).forEach((prod) => {
      let new_prod = document.createElement("div");
      new_prod.classList.add("item");
      new_prod.innerHTML = `
                <img class="item_img" src="${prod.image}" alt="">
                <div class="card_text">
                    <h4>${prod.name}</h4>
                    <p>${prod.description}</p>
                    <p>stockQuantity : ${prod.stockQuantity}</>
                    <div class="rating">
                    <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-solid fa-star star_done"></i>
                        <i class="star fa-regular fa-star"></i>
                        <i class="star fa-regular fa-star"></i>
                    </div>
                    <h3 class="price">${prod.price} $</h3>
                    ${
                      loggedInUser.isAdmin
                        ? `<button class="main_btn card_btn edit-btn">Edit</button>
                            <button class="main_btn card_btn delete-btn">Delete</button>`
                        : `<button class="main_btn card_btn add-to-cart-btn">Add to Cart</button> <br />
                        <button class="main_btn card_btn add-to-wish-btn">Add to wishlist</button>
                        `
                    }
                    <span id="prod_code">code: ${prod.id}</span>
                    <span class="category">category:${prod.category}</span>
                </div>
      `;

      if (loggedInUser.isAdmin) {
        let deleteButton = new_prod.querySelector(".delete-btn");
        deleteButton.addEventListener("click", () => {
          deleteProduct(prod.id);
        });

        // we should apply the Edit functoinality here
        let editButton = new_prod.querySelector(".edit-btn");
        editButton.addEventListener("click", () => {
          console.log("Edit button clicked for product ID:", prod.id);
          editProduct(prod.id);
        });

      } else if (!loggedInUser.isAdmin) {
        let addToCartButton = new_prod.querySelector(".add-to-cart-btn");
        addToCartButton.addEventListener("click", () => {
          addToCart(prod.id);
        });
        let addTowishListButton = new_prod.querySelector('.add-to-wish-btn');
        addTowishListButton.addEventListener("click", () => {
          addToWishlist(prod.id)
        });
      }

      products_dom.appendChild(new_prod);
    });
  }
};
// *******************************add new_product*******************




add_prod_btn.addEventListener("click", () => {
  add_prod_box.innerHTML="";
  let add_form=`
      <div class="add_product_data" id="add_product_data">
        <form onsubmit="add_prod_data(event)">
            <input type="text" name="" placeholder="enter product name" id="">
            <input type="text" name="" placeholder="price" id="">
            <input type="file" accept=".png, .jpg, .jpeg">
             <input type="submit" value="ADD">
             <input type="button" onclick="hide_box()" value="Cancel">
        </form>
      </div>
  `
  add_prod_box.innerHTML=add_form;
  add_prod_box.classList.remove("hide");
});
// on submit (add prod)
function add_prod_data(event) {
  event.preventDefault();
  let name = event.target.children[0].value;
  let price = event.target.children[1].value;
  let img = event.target.children[2].value
    ? `../products_img/${event.target.children[2].files[0].name}`
    : "../products_img/img_not.jpg";
  console.log(img);
  const new_prod = {
    id: allProd.length,
    name: name,
    image: img,
    price: price,
  };
  if (name && price && img) {
    allProd.unshift(new_prod);
    addProductsToDom();
    add_prod_box.classList.add("hide");
    console.log(add_prod_box);
  }
}
function hide_box() {
  add_prod_box.classList.add("hide");
}
const getData = () => {
  fetch("../products.json")
    .then((response) => response.json())
    .then((data) => {
      allProd = data;
      addProductsToDom();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

const loadMoreProducts = () => {
  const remainingProducts = allProd.length - displayedProducts;
  if (remainingProducts > 0) {
    const productsToDisplay = Math.min(productsToAdd, remainingProducts);
    displayedProducts += productsToDisplay;
    addProductsToDom();
  }
};

document
  .querySelector(".load_more")
  .addEventListener("click", loadMoreProducts);

// --------------------------------------------------------
// search
let search_input=document.getElementById("search_input")
function search_prod(){
  search_input.classList.toggle('hide');
  console.log(allProd)
}
search_input.addEventListener('keyup',function(){
    console.log(this.value)
    if(search_input.value!==''){
      let newArray=allProd.filter(e=>e.name.toLowerCase().startsWith(this.value.toLowerCase()));
      products_dom.innerHTML="";
      newArray.forEach((prod) => {
        let new_prod = document.createElement("div");
        new_prod.classList.add("item");
        new_prod.innerHTML = `
                  <img class="item_img" src="${prod.image}" alt="">
                  <div class="card_text">
                      <h4>${prod.name}</h4>
                      <p>${prod.description}</p>
                      <p>stockQuantity : ${prod.stockQuantity}</>
                      <div class="rating">
                      <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-solid fa-star star_done"></i>
                          <i class="star fa-regular fa-star"></i>
                          <i class="star fa-regular fa-star"></i>
                      </div>
                      <h3 class="price">${prod.price} $</h3>
                      ${
                        loggedInUser.isAdmin
                          ? `<button class="main_btn card_btn edit-btn">Edit</button>
                              <button class="main_btn card_btn delete-btn">Delete</button>`
                          : `<button class="main_btn card_btn add-to-cart-btn">Add to Cart</button>`
                      }
                      <span id="prod_code">code: ${prod.id}</span>
                      <span class="category">category:${prod.category}</span>
                  </div>
        `;
        products_dom.appendChild(new_prod);
      });
    }else{
      addProductsToDom()
    }
});
search_input.addEventListener("blur",function(){
  this.classList.add("hide");
  addProductsToDom()
})
getData();
