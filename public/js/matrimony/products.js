document.addEventListener("DOMContentLoaded", function () {
  var MenuItems = document.getElementById("MenuItems");
  var ProductImg = document.getElementById("ProductImg");
  var SmallImg = document.getElementsByClassName("small-img");
  // var selectOption = document.getElementById("sizeoption");
  var originalTextElement = document.getElementById("originalText");

  // Menu toggle functionality
  document.addEventListener('DOMContentLoaded', function () {
    const MenuItems = document.getElementById('MenuItems');

    if (MenuItems) {
      function menutoggle() {
        if (MenuItems.style.maxHeight === "0px") {
          MenuItems.style.maxHeight = "200px";
        } else {
          MenuItems.style.maxHeight = "0px";
        }
      }
    } else {
      console.error('MenuItems element not found.');
    }
  });

  // Product image selection
  for (var i = 0; i < SmallImg.length; i++) {
    SmallImg[i].onclick = function () {
      ProductImg.src = this.src;
    };
  }

  // Display select option based on product category
  // var originalTextContent = document.getElementById("originalText").textContent.trim().toLowerCase();
  // var selectOption = document.getElementById("sizeoption");
  // if (originalTextContent.includes("clothing")) {
  //   selectOption.style.display = "block";
  //   selectOption.disabled = false;
  // } else {
  //   selectOption.style.display = "none";
  //   selectOption.disabled = true;
  // }

  // Generate hyperlinks for original text
  var originalText = originalTextElement.textContent;
  var parts = originalText.split(" >> ");
  var newHtml = "";
  var previousPart = ""; // Keep track of the previous part
  for (var i = 0; i < parts.length; i++) {
    // Convert the part to lowercase and replace special characters with underscores
    var simplifiedFilename = parts[i].trim().toLowerCase().replace(/[^a-zA-Z0-9]+/g, '-');
    // Construct the hyperlink URL
    var href = simplifiedFilename + ".html";
    // Add the hyperlink only if the current part is different from the previous part
    if (parts[i].trim() !== previousPart) {
      // Append the hyperlink to the HTML content
      newHtml += '<a href="' + href + '">' + parts[i].trim() + '</a>';
      // Add " >> " between hyperlinks except for the last part
      if (i < parts.length - 1) {
        newHtml += " >> ";
      }
      // Update the previous part for the next iteration
      previousPart = parts[i].trim();
    }
  }
  // Update the HTML content of the original text element with the generated hyperlinks
  originalTextElement.innerHTML = newHtml;

  // Update the content of the paragraph with hyperlinks
  originalTextElement.innerHTML = newHtml;
});
// Function to get cookie value by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Function to display username
function displayUsername() {
  const username = getCookie('username'); // Assuming the username is stored in a cookie named 'username'
  if (username) {// Function to increment the value of the input field
    function incrementValue() {
      var value = parseInt(document.getElementById('quantity').value, 10);
      value = isNaN(value) ? 1 : value;
      value++;
      document.getElementById('quantity').value = value;
    }
    // Function to decrement the value of the input field
    function decrementValue() {
      var value = parseInt(document.getElementById('quantity').value, 10);
      value = isNaN(value) ? 1 : value;
      value--;
      if (value < 1) {
        value = 1;
      }
      document.getElementById('quantity').value = value;
    }
    document.getElementById('usernameDisplay').innerText = 'Welcome, ' + username;
  } else {
    document.getElementById('usernameDisplay').innerText = 'Welcome!'; // Default message if username cookie doesn't exist
  }
}

// Check if user is logged in and display username
const loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', function (event) {
  // Assuming your login process sets a cookie named 'username' upon successful login
  // You should replace 'username' with the actual name of the cookie storing the username
  const username = getCookie('username');
  if (username) {
    displayUsername();
  }
});

// Call displayUsername() function when the page loads to check if user is already logged in
window.onload = displayUsername;

// Function to retrieve cart items from cookies
// Function to retrieve cart items from cookies
function getCartItemsFromCookies() {
  // Retrieve cart items from cookies
  const cookies = document.cookie.split(';');
  let cartItems = '';
  cookies.forEach(cookie => {
    if (cookie.trim().startsWith('cartItems=')) {
      cartItems = cookie.trim().substring(10); // Remove 'cartItems=' from the beginning
    }
  });
  return cartItems;
}

// Function to count the number of items in the cart
function countCartItems() {
  const cartItems = getCartItemsFromCookies();
  // If there are no cart items, return 0
  if (!cartItems) {
    return 0;
  }
  // Parse cart items from cookies string
  const parsedCartItems = JSON.parse(cartItems);
  // Count the number of items
  return parsedCartItems.length;
}

// Update the count displayed in the HTML
function updateItemCount() {
  const countElement = document.querySelector('.count');
  if (countElement) {
    const itemCount = countCartItems();
    countElement.textContent = itemCount;
  }
}
//count update in mobile mode
function updateItemCount() {
  const countElement = document.querySelector('.count');
  const countElement1 = document.querySelector('.count1');
  if (countElement) {
    const itemCount = countCartItems();
    countElement.textContent = itemCount;
    countElement1.textContent = itemCount;
  }
}


// Call updateItemCount to initially display the count
updateItemCount();
function getCartItems() {
  var cookie = document.cookie;
  if (cookie) {
    var cookiesArray = cookie.split(';');
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookieItem = cookiesArray[i].trim();
      if (cookieItem.startsWith("cartItems=")) {
        var cartItemsJSON = cookieItem.substring("cartItems=".length);
        return JSON.parse(cartItemsJSON);
      }
    }
  }
  return null;
}



function getCartItems() {
  var cookie = document.cookie;
  if (cookie) {
    var cookiesArray = cookie.split(';');
    for (var i = 0; i < cookiesArray.length; i++) {
      var cookieItem = cookiesArray[i].trim();
      if (cookieItem.startsWith("cartItems=")) {
        var cartItemsJSON = cookieItem.substring("cartItems=".length);
        return JSON.parse(cartItemsJSON);
      }
    }
  }
  return null;
}
document.addEventListener("DOMContentLoaded", function () {
  // Get the Buy Now button element
  var addToCartBtn = document.getElementById("addToCartBtn");

  // Add a click event listener to the Buy Now button
  addToCartBtn.addEventListener("click", function (event) {
    // Prevent the default behavior of the anchor tag (i.e., navigating to the href URL)
    event.preventDefault();

    // Redirect to the checkout page
    window.location.href = addToCartBtn.getAttribute("href");
  });
});
function addToCart() {
  var name = document.getElementById("h1").innerText;
  var price = document.querySelector("h4").innerText;
  var size = document.getElementById("sizeoption").value;
  var quantity = document.getElementById("quantity").value;
  var image = document.getElementById("ProductImg").src;
  console.log(name);
  // Check if all necessary product details are present
  if (name) {
    // Construct product details object
    var productDetails = {
      name: name,
      price: price,
      size: size,
      quantity: quantity,
      image: image
    };

    // Get existing cart items or initialize an empty array
    var cartItems = getCartItems() || [];

    // Push the new product to the cart items array
    cartItems.push(productDetails);

    // Convert the cart items array to JSON string
    var cartItemsJSON = JSON.stringify(cartItems);

    // Set the cart items to cookies
    document.cookie = "cartItems=" + cartItemsJSON + "; path=/"; // Ensure SameSite and Secure policies are correctly set on your server

    console.log("Product added to cart successfully.");
  } else {
    console.error("Failed to add product to cart: Invalid product details.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the Buy Now button element
  var buyNowBtn = document.getElementById("buyNowBtn");

  // Add a click event listener to the Buy Now button
  buyNowBtn.addEventListener("click", function (event) {
    // Prevent the default behavior of the anchor tag (i.e., navigating to the href URL)
    event.preventDefault();

    // Redirect to the checkout page
    window.location.href = buyNowBtn.getAttribute("href");
  });
});
function buyNow() {
  var name = document.getElementById("h1").innerText;
  var price = document.querySelector("h4").innerText;
  var size = document.getElementById("sizeoption").value;
  var quantity = document.getElementById("quantity").value;
  var image = document.getElementById("ProductImg").src;
  console.log(name);
  // Check if all necessary product details are present
  if (name) {
    // Construct product details object
    var productDetails = {
      name: name,
      price: price,
      size: size,
      quantity: quantity,
      image: image
    };

    // Get existing cart items or initialize an empty array
    var cartItems = getCartItems() || [];
    cartItems.push(productDetails);

    // Convert the cart items array to JSON string
    var cartItemsJSON = JSON.stringify(cartItems);

    // Set the cart items to cookies

    // Push the new product to the cart items array
    //cartItems.push(productDetails);

    // Convert the cart items array to JSON string
    var cartItemsJSON = JSON.stringify(cartItems);

    // Set the cart items to cookies
    document.cookie = "cartItems=" + cartItemsJSON + "; path=/"; // Ensure SameSite and Secure policies are correctly set on your server

    console.log("Product added to cart successfully.");
  } else {
    console.error("Failed to add product to cart: Invalid product details.");
  }
}


// Function to increment the value of the input field
function incrementValue() {
  var value = parseInt(document.getElementById('quantity').value, 10);
  value = isNaN(value) ? 1 : value;
  value++;
  document.getElementById('quantity').value = value;
}// Function to increment the value of the input field
function incrementValue() {
  var value = parseInt(document.getElementById('quantity').value, 10);
  value = isNaN(value) ? 1 : value;
  value++;
  document.getElementById('quantity').value = value;
}
// Function to decrement the value of the input field
function decrementValue() {
  var value = parseInt(document.getElementById('quantity').value, 10);
  value = isNaN(value) ? 1 : value;
  value--;
  if (value < 1) {
    value = 1;
  }
  document.getElementById('quantity').value = value;
}
// Function to decrement the value of the input field
function decrementValue() {
  var value = parseInt(document.getElementById('quantity').value, 10);
  value = isNaN(value) ? 1 : value;
  value--;
  if (value < 1) {
    value = 1;
  }
  document.getElementById('quantity').value = value;
}

