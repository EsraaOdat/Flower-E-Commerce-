
// Function to simulate login and store a fake token in localStorage

// note: there should be a function in login logic to store the token


//     // Retrieve the stored data from localStorage
// const storedData = localStorage.getItem("userID");

// // Parse the string to convert it back into an object
// const parsedData = JSON.parse(storedData);

// // Access the userId
// const userID = JSON.parse(storedData);

window.addEventListener('pageshow', function(event) {
    if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
        // Reload the page to fetch new data
        window.location.reload();
    }
});

// Check if the user is logged in by checking the presence of the token
function isUserLoggedIn() {
    return !!localStorage.getItem('userID'); // If token exists, return true
}

// // note: there should be a function in logout logic to remove the token
function logoutUser() {
    localStorage.removeItem('userID'); // Remove token from localStorage
}


// Function to load all cart items by user ID
async function GetCartItems(userId) {
    
    if(userId == null) {
        GetCartItemslocal();
        
        
    }else{
    const url = `${baseUrl}/api/Cart/GetAllCartItemsByUserId/${userId}`; 
    try {
        const request = await fetch(url);
        const response = await request.json();
        
        if (!response.length) {
            console.error("No cart items found.");
            alert("No cart items found.");

            return;
        }

        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear any existing content

        let cartSubtotal = 0;

        response.forEach((item) => {
            let itemPrice = item.prodcutDTO.price;
            let itemQuantity = item.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <tr>
                <td class="cart-product-remove">
                    <button onclick="removeCartItemNAVCART(${item.userId}, ${item.productId})">x</button>
                </td>
                <td class="cart-product-image">
                    <a href="product-details.html"><img src="../../../Back-End/E-Commerce/E-Commerce/Images/${item.prodcutDTO.image}" alt="${item.prodcutDTO.name}"></a>
                </td>
                <td class="cart-product-info">
                    <h4><a href="product-details.html">${item.prodcutDTO.name}</a></h4>
                </td>
                <td class="cart-product-price">$${item.prodcutDTO.price.toFixed(2)}</td>
                <td class="cart-product-quantity">
                    <div class="cart-plus-minus">
                        <button class="dec qtybutton" onclick="changeQuantity(${item.userId}, ${item.productId}, ${item.quantity}, 'dec')">-</button>
                        <input type="number" value="${item.quantity}" name="qtybutton" class="cart-plus-minus-box" id="quantity-${item.cartItemId}">
                        <button class="inc qtybutton" onclick="changeQuantity(${item.userId}, ${item.productId}, ${item.quantity}, 'inc')">+</button>
                    </div>
                </td>
                <td class="cart-product-subtotal">$${itemSubtotal.toFixed(2)}</td>
            </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("cart-subtotal").innerText = `$${cartSubtotal.toFixed(2)}`;
        document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee

    } catch (error) {
        console.error("Error fetching cart items:", error);
    }
}

}
GetCartItems(userID);  // Replace with dynamic userId if needed



// Function to handle checkout, ensuring the user is logged in
function proceedToCheckout() {
    if (!isUserLoggedIn()) {
        window.location.href = '../bassam/login.html'; // Redirect to login if user isn't logged in
    } else {
        window.location.href = 'checkout.html'; // Proceed to checkout if logged in
    }
}

// Function to change quantity based on whether + or - is clicked
async function changeQuantity(userId, productId, currentQuantity, action) {
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
async function removeCartItemNAVCART(userId, productId) {
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
            GetCartItems(userId); // Refresh the cart
        } else {
            console.error(`Failed to remove cart item for product ${productId}`);
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
    }
    location.reload();
}

// Call the function to load the cart items (assuming a static userId, replace it dynamically)


function GetCartItemslocal(){
    var existingCart = localStorage.getItem("cart");
        var cart = JSON.parse(existingCart);

        const cartItemsContainer = document.getElementById("cart-items-container");
        cartItemsContainer.innerHTML = ""; // Clear any existing content

        let cartSubtotal = 0;

        cart.forEach((element, index) => {
            let itemPrice = element.price;
            let itemQuantity = element.quantity;
            let itemSubtotal = itemPrice * itemQuantity;

            cartSubtotal += itemSubtotal;

            let row = `
            <tr>
                <td class="cart-product-remove">
                    <button onclick="removeCartItemLocal( ${element.productId})">x</button>
                </td>
                <td class="cart-product-image">
                    <a href="product-details.html"><img src="../../../Back-End/E-Commerce/E-Commerce/Images/${element.image}" alt="${element.name}"></a>
                </td>
                <td class="cart-product-info">
                    <h4><a href="product-details.html">${element.name}</a></h4>
                </td>
                <td class="cart-product-price">$${element.price}</td>
                <td class="cart-product-quantity">
                    <div class="cart-plus-minus">
                        <button class="dec qtybutton" onclick="changeQuantityLocal(${element.productId}, ${element.quantity}, 'dec')">-</button>
                        <input type="number" value="${element.quantity}" name="qtybutton" class="cart-plus-minus-box" id="quantity-${index}">
                        <button class="inc qtybutton" onclick="changeQuantityLocal(${element.productId}, ${element.quantity}, 'inc')">+</button>
                    </div>
                </td>
                <td class="cart-product-subtotal">$${itemSubtotal.toFixed(2)}</td>
            </tr>
            `;
            cartItemsContainer.innerHTML += row;
        });

        document.getElementById("cart-subtotal").innerText = `$${cartSubtotal.toFixed(2)}`;
        document.getElementById("order-total").innerText = `$${(cartSubtotal + 15).toFixed(2)}`; // Assuming $15 shipping fee

       
} 

function changeQuantityLocal(productId, currentQuantity, action) {
    debugger;
    var existingCart = localStorage.getItem("cart");
    var cart = JSON.parse(existingCart);

    // Find the item in the cart by productId
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        if (!Number.isInteger(cart[itemIndex].quantity)) {
            var q = Number(cart[itemIndex].quantity);
             // Updating the original quantity
        }else {
            var q = cart[itemIndex].quantity;
        }
        // Update the quantity based on the action
        if (action === 'inc') {
            q += 1; // Increment quantity
        } else if (action === 'dec') {
            q -= 1; // Decrement quantity
            
            // Remove item if quantity reaches 0
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1); // Remove item from cart
            }
        }
        cart[itemIndex].quantity = q; 

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Optionally, refresh the cart UI
        GetCartItems(userID);  // Refreshes the cart display to reflect the changes
    }
}
function removeCartItemLocal(productId) {
    var existingCart = localStorage.getItem("cart");
    var cart = JSON.parse(existingCart);

    // Find the item index by productId
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
        // Remove the item from the cart array
        cart.splice(itemIndex, 1);

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        // Optionally, refresh the cart UI
        GetCartItemslocal();  // Refresh the cart display to reflect the changes

        // If the cart is empty, handle it (e.g., show an empty cart message)
        if (cart.length === 0) {
            document.getElementById("cart-items-container").innerHTML = "<p>Your cart is empty.</p>";
            document.getElementById("cart-subtotal").innerText = "$0.00";
            document.getElementById("order-total").innerText = "$15.00";  // Assuming shipping still applies
        }
    }
}


