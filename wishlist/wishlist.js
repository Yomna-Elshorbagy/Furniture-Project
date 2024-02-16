document.addEventListener("DOMContentLoaded", function () {
    const wishlistContainer = document.getElementById("wishlist-container");
  
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    const wishlist = loggedInUser.wishlist || [];
  
    const createWishlistItemHTML = (item) => {
      return `
        <div class="wishlist-item">
          <img src="${item.image}" alt="${item.name}">
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <p>Price: ${item.price} $</p>
          <button onclick="removeFromWishlist(${item.id})">Remove</button>
        </div>
      `;
    };

    const renderWishlistItems = () => {
      wishlistContainer.innerHTML = "";
      wishlist.forEach((item) => {
        wishlistContainer.innerHTML += createWishlistItemHTML(item);
      });
    };
    renderWishlistItems();
  
    window.removeFromWishlist = (productId) => {
      const index = wishlist.findIndex((item) => item.id === productId);
      if (index !== -1) {
        wishlist.splice(index, 1);
        loggedInUser.wishlist = wishlist;
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        renderWishlistItems();
      }
    };
  });
  