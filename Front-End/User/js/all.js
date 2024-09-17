const storedData = localStorage.getItem("userID");

// Parse the string to convert it back into an object
const parsedData = JSON.parse(storedData);

// Access the userId
const userID = JSON.parse(storedData);

async function addToCart(id, name, price, image) {
    ;
    var q = document.getElementById("quantity")
    if (q == null) {
       var  Quantity = 1;
    }else {
        var  Quantity = q.value; 
    }
    if (userID > 0 || userID != null) {
    var requist = await fetch('https://localhost:7000/api/Cart/CreateNewCartItem', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: id,
            userId: userID,
            quantity: Quantity

        })
    });
}else{
    var storeInlocal = {
        "productId": id,
        "userId": 0,
        "quantity": Quantity,
        "name" : name,
        "price" : price,
        "image" : image

      }



    // Check if a cart exists in localStorage
  var existingCart = localStorage.getItem("cart");

  // If cart exists, parse it, else create an empty array
  var cart = existingCart ? JSON.parse(existingCart) : [];

      // Check if the product already exists in the cart by productId
      const itemIndex = cart.findIndex(item => item.productId === storeInlocal.productId);

      if (itemIndex !== -1) {
        // If the product exists, update its quantity
        cart[itemIndex].quantity += storeInlocal.quantity;
    } else {
        // If the product doesn't exist, add it to the cart
        cart.push(storeInlocal);
    }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}
    // SweetAlert for localStorage cart addition with image
    Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        html: `<p>${name} has been added to your cart!</p><img src="../../../Back-End/E-Commerce/E-Commerce/Images/${image}" alt="${name}" style="width:100px; height:auto; margin-top:10px;">`,
        timer: 3000,
        showConfirmButton: false
    }).then(() => {
        // Reload the page after the alert is closed
        location.reload();
    });
}

function showAddToCartModal(id, name, price, image) {
    // Update the product image
    document.getElementById("modal-product-img").src = image;
    document.getElementById("modal-product-img").alt = name;

    // Update the product name and link
    document.getElementById("modal-product-name").innerHTML = `<a href="product-details.html?id=${id}">${name}</a>`;

    // Open the modal using Bootstrap's modal method
    var myModal = new bootstrap.Modal(document.getElementById('add_to_cart_modal'), {
        keyboard: false
    });
    myModal.show();
}


const baseUrl = "https://localhost:7000"; 

// Function to simulate login and store a fake token in localStorage

// note: there should be a function in login logic to store the token









// Check if the user is logged in by checking the presence of the token
function isUserLoggedIn() {
    return !!localStorage.getItem('userID'); // If token exists, return true
}

function user() {
    ;
    if (!isUserLoggedIn()) {
        window.location.href = '../bassam/login.html'; // Redirect to login if user isn't logged in
    } else {
        window.location.href = '../Esraa/account.html'; // Proceed to checkout if logged in
    }
}

// // note: there should be a function in logout logic to remove the token
function logoutUser() {
    localStorage.removeItem('userID'); // Remove token from localStorage
    localStorage.removeItem('jwtToken'); // Remove token from localStorage
    window.location.href = '../Home/index.html';
}

// Function to load all cart items by user ID
async function GetCartItemsNAVCART(userId) {
    ;
    if(userId == null) {
        GetCartItemslocalNAVCART();
        
        
    }else{
    const url = `${baseUrl}/api/Cart/GetAllCartItemsByUserId/${userId}`; 
    try {
        const request = await fetch(url);
        const response = await request.json();
        
        if (!response.length) {
            console.error("No cart items found.");
            alert("No cart items found.");
            document.getElementById("countofcart").innerText = 0; // Set count to 0 if no items are found
            return;
        }
        let uniqueItemCount = response.length; // The number of unique items (products)


        const cartItemsContainer = document.getElementById("miniCart");
        cartItemsContainer.innerHTML = ""; // Clear any existing content

        let cartSubtotal = 0;

        response.forEach((item) => {
            let itemPrice = item.prodcutDTO.price;
            let itemQuantity = item.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <div class="mini-cart-item clearfix">
                <div class="mini-cart-img">
                    <a href="#"><img src="../../../Back-End/E-Commerce/E-Commerce/Images/${item.prodcutDTO.image}" alt="Image"></a>
                    <span class="mini-cart-item-delete" onclick="removeCartItemVANCART(${item.userId}, ${item.productId})"><i class="icon-trash"></i></span>
                </div>
                <div class="mini-cart-info">
                    <h6><a href="#">${item.prodcutDTO.name}</a></h6>
                    <span class="mini-cart-quantity">${itemQuantity} x $${itemSubtotal}</span>
                </div>
            </div>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("subtotalMINICART").innerText = `$${cartSubtotal.toFixed(2)}`;
        document.getElementById("subtotalMINICART2").innerText = `$${cartSubtotal.toFixed(2)}`;

        // document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee
        document.getElementById("countofcart").innerText = uniqueItemCount;

    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}
}

// Function to handle checkout, ensuring the user is logged in
function proceedToCheckoutNAVCART() {
    if (!isUserLoggedIn()) {
        window.location.href = '../bassam/login.html'; // Redirect to login if user isn't logged in
    } else {
        window.location.href = '../FawarehWork/checkout.html'; // Proceed to checkout if logged in
    }
}

// Function to change quantity based on whether + or - is clicked
async function changeQuantityNAV(userId, productId, currentQuantity, action) {
    let quantityChange = currentQuantity;

    if (action === 'inc') {
        quantityChange++;
    } else if (action === 'dec') {
        quantityChange--;
    }

    if (quantityChange === 0) {
        removeCartItem(userId, productId);
        return;
    }

    const url = `${baseUrl}/api/Cart/UpdateCartItem`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                quantityChange: quantityChange - currentQuantity
            }),
        });

        if (response.ok) {
            console.log(`Quantity updated for product ${productId} to ${quantityChange}`);
            GetCartItems(userID); // Refresh cart
        } else {
            console.error(`Failed to update quantity for product ${productId}`);
        }
    } catch (error) {
        console.error("Error updating quantity:", error);
    }
}

// Function to remove a cart item
async function removeCartItemVANCART(userId, productId) {
    const url = `${baseUrl}/api/Cart/UpdateCartItem`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                quantityChange: -1000 // Trigger removal
            }),
        });

        if (response.ok) {
            console.log(`Cart item for product ${productId} removed successfully`);
            location.reload();
            GetCartItemsNAVCART(userId); // Refresh the cart
        } else {
            console.error(`Failed to remove cart item for product ${productId}`);
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
    }
    location.reload();

}

// Call the function to load the cart items (assuming a static userId, replace it dynamically)


function GetCartItemslocalNAVCART(){
    var existingCart = localStorage.getItem("cart");
    if (!existingCart) {
        // If the cart is empty or doesn't exist, show 0 items and return
        document.getElementById("countofcart").innerText = 0;
        return;
    }
        var cart = JSON.parse(existingCart);

        const cartItemsContainer = document.getElementById("miniCart");
        cartItemsContainer.innerHTML = ""; // Clear any existing content
        let cartSubtotal = 0;
        let uniqueItemCount = cart.length; // The number of unique items (products)


        cart.forEach((element, index) => {
            let itemPrice = element.price;
            let itemQuantity = element.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <div class="mini-cart-item clearfix">
                <div class="mini-cart-img">
                    <a href="#"><img src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="Image"></a>
                    <span class="mini-cart-item-delete" onclick="removeCartItemLocalNAV(${element.productId})"><i class="icon-trash"></i></span>
                </div>
                <div class="mini-cart-info">
                    <h6><a href="#">${element.name}</a></h6>
                    <span class="mini-cart-quantity">${itemQuantity} x $${itemSubtotal}</span>
                </div>
            </div>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("subtotalMINICART").innerText = `$${cartSubtotal.toFixed(2)}`;
        // document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee

           // Update the item count in the countofcart div with the number of unique items
    document.getElementById("countofcart").innerText = uniqueItemCount;
}


function changeQuantityLocalNAV(productId, currentQuantity, action) {
    var existingCart = localStorage.getItem("cart");
    var cart = JSON.parse(existingCart);

    // Find the item in the cart by productId
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        // Update the quantity based on the action
        if (action === 'inc') {
            cart[itemIndex].quantity += 1; // Increment quantity
        } else if (action === 'dec') {
            cart[itemIndex].quantity -= 1; // Decrement quantity
            
            // Remove item if quantity reaches 0
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1); // Remove item from cart
            }
        }

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Optionally, refresh the cart UI
        GetCartItems(userID);  // Refreshes the cart display to reflect the changes
    }
}
function removeCartItemLocalNAV(productId) {
    var existingCart = localStorage.getItem("cart");
    var cart = JSON.parse(existingCart);
;
    // Find the item index by productId
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        // Remove the item from the cart array
        cart.splice(itemIndex, 1);

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Optionally, refresh the cart UI
        GetCartItemslocalNAVCART();  // Refresh the cart display to reflect the changes

        // If the cart is empty, handle it (e.g., show an empty cart message)
        if (cart.length === 0) {
            document.getElementById("cart-items-container").innerHTML = "<p>Your cart is empty.</p>";
            document.getElementById("cart-subtotal").innerText = "$0.00";
            document.getElementById("order-total").innerText = "$15.00";  // Assuming shipping still applies
        }
    }
    // location.reload();
}


function navbarLogedORnot() {
    var navbarLogedORnot = document.getElementById("navbarLogedORnot");

    if (userID == null) {
        navbarLogedORnot.innerHTML = `
        <ul>
            <li>
                <a href="#" onclick="user()"><i class="icon-user"></i></a>
                <ul>
                    <li><a href="../bassam/login.html">Sign in</a></li>
                    <li><a href="../bassam/register.html">Register</a></li>
                </ul>
            </li>
        </ul>
        `;
    } else {
        navbarLogedORnot.innerHTML = `
        <ul>
            <li>
                <a href="#" onclick="user()"><i class="icon-user"></i></a>
                <ul>
                    <li><a href="#" onclick="user()">My Account</a></li>
                    <li><a href="#" onclick="logoutUser()">Log Out</a></li>
                </ul>
            </li>
        </ul>
        `;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    navbarLogedORnot();
    GetCartItemsNAVCART(userID);  // Replace with dynamic userId if needed

});
