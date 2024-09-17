console.log("WTF")

    // // Retrieve the stored data from localStorage
    // const storedData = localStorage.getItem("userID");

    // // Parse the string to convert it back into an object
    // const parsedData = JSON.parse(storedData);
    
    // // Access the userId
    // const userID = JSON.parse(storedData);

async function GetCartItems(userId) {
    ;
    const url = `${baseUrl}/api/Cart/GetAllCartItemsByUserId/${userId}`; 

    const request = await fetch(url);
    const response = await request.json();

    const cartItemsContainer = document.getElementById("CartItemsContainer");
    cartItemsContainer.innerHTML = ""; // Clear existing entries

    let orderTotal = 0;

    response.forEach(element => {
        const subtotal = element.prodcutDTO.price * element.quantity;
        orderTotal += subtotal;
        const row = `
            <tr>
                <td>${element.prodcutDTO.name} <strong>× ${element.quantity}</strong></td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>`;
        cartItemsContainer.innerHTML += row; // Append new rows to the table
    });

    // Set fixed shipping and VAT for demonstration
    const shippingCost = 15.00;
    let wheelPrize = parseFloat(localStorage.getItem("wheelPrize")); // Assume 0% VAT for simplicity, update as needed

    document.getElementById("shippingCost").textContent = `$${shippingCost.toFixed(2)}`;
    if (isNaN(wheelPrize)) {
        wheelPrize = 0;
        
    }
    // else {
    
        
    //     document.getElementById("wheelPrize").textContent = `-$${wheelPrize.toFixed(2)}`;
    // }
    document.getElementById("wheelPrize").textContent = `-$${wheelPrize.toFixed(2)}`;

    // Calculate final order total including shipping and VAT
    orderTotal += shippingCost;
    
    const pointsvalue = parseFloat(localStorage.getItem("points")); // Convert the points value to a floating number
   

    if (pointsvalue <=20 && pointsvalue>0) {
// Update order total in the designated row
document.getElementById("orderTotal").textContent = `$${(orderTotal.toFixed(2) - 5 - wheelPrize ).toFixed(2)}`;

    document.getElementById("orderTotalHidden").value = `${(orderTotal.toFixed(2)- 5 - wheelPrize).toFixed(2)}`;

    
     pointsValue.innerHTML = `Your Total Points are: ${pointsvalue}. You got $5 off your order!`
    pointsValue.style.color = "red";
}
else if (pointsvalue <=50 && pointsvalue>0) {
    document.getElementById("orderTotal").textContent = `$${(orderTotal.toFixed(2) - 10 - wheelPrize).toFixed(2)}`;

    document.getElementById("orderTotalHidden").value = `${(orderTotal.toFixed(2)- 10 - wheelPrize).toFixed(2)}`;
  
    
    pointsValue.innerHTML = `Your Total Points are: ${pointsvalue}. You got $10 off your order!`
    
    pointsValue.style.color = "blue";

}

else if (pointsvalue >50) {
    document.getElementById("orderTotal").textContent = `$${(orderTotal.toFixed(2) - 15 - wheelPrize).toFixed(2)}`;

    document.getElementById("orderTotalHidden").value = `${(orderTotal.toFixed(2)- 15 - wheelPrize).toFixed(2)}`;

   
    pointsValue.innerHTML = `Your Total Points are: ${pointsvalue}. You got $15 off your order!`

    pointsValue.style.color = "green";
}
else if(pointsvalue == null){
   document.getElementById("orderTotal").textContent = `$${(orderTotal.toFixed(2) - 0 - wheelPrize ).toFixed(2)}`;

    document.getElementById("orderTotalHidden").value = `${(orderTotal.toFixed(2)- 0 - wheelPrize ).toFixed(2)}`;

 

    pointsValue.innerHTML = `Your Total Points are: 0. You got $0 off your order!`

    pointsValue.style.color = "black";
}else{
    document.getElementById("orderTotal").textContent = `$${(orderTotal.toFixed(2) - 0 - wheelPrize ).toFixed(2)}`;

    document.getElementById("orderTotalHidden").value = `${(orderTotal.toFixed(2)- 0 - wheelPrize ).toFixed(2)}`;

 

    pointsValue.innerHTML = `Your Total Points are: 0. You got $0 off your order!`

    pointsValue.style.color = "black";
}
    }


GetCartItems(userID);



async function FillAutomatic() {
    ;
    
    const url = `${baseUrl}/api/UserFillAutomatic/GetUserById/${userID}`;
    const request = await fetch(url);
    const data = await request.json();

    
    nameInput = document.getElementById("name");
    nameInput.value = data.name;

    emailInput = document.getElementById("email");
    emailInput.value = data.email;

    phoneNumberInput = document.getElementById("phoneNumber");
    phoneNumberInput.value = data.phoneNumber;

    addressInput = document.getElementById("address");
    addressInput.value = data.address;

    pointsValue = document.getElementById("pointsValue");

    

    localStorage.setItem("points", data.points)
  
    
}
FillAutomatic()


// async function PaypalPayment() {
//     const url = "https://localhost:7000/api/Payment/create";
//     const request = await fetch(url);
//     const data = await request.json();

    
// }


async function AddOrders() {
   
    localStorage.removeItem("wheelPrize")
    var coponId = document.getElementById('coupon-code').value; // Assuming you want the value of the input
    var totalAmount = document.getElementById("orderTotalHidden").value; // Assuming you want the value, not the element


    var couponID = localStorage.getItem("CoponID");
    localStorage.setItem("totalAmountToPAy", totalAmount);

    const formData = {
        userId: userID,
        amount: parseFloat(totalAmount), // Ensure it's treated as a float number
        coponId: parseInt(coponId, 10), // Assuming it's an integer, parse it to ensure it's sent as a number
        status: "Pending",
        transactionId: "123456789"
    };

    SetPointsToZero();

    try {
        const response = await fetch("https://localhost:7000/api/Order/CreateOrder", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json' 
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }

        const data = await response.json(); 
        console.log(data); 
        
        alert("Order successfully created!");
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        alert("Failed to create order!");
    }
}
async function applyCoupon() {
    let isCouponApplied = localStorage.getItem("IsCouponApplied") === "true";  // Check if a coupon has been applied
    let originalTotal = parseFloat(document.getElementById("orderTotalHidden").value) || 0;  // Get the original total
    const couponInput = document.getElementById('coupon-code');
    const couponApplied = couponInput.value.trim();  // Get the coupon code

    if (!couponApplied) {
        // If input is cleared, reset the total to original amount and remove the coupon
        const storedCouponAmount = parseFloat(localStorage.getItem("CouponAmount")) || 0;
        const newTotal = originalTotal + storedCouponAmount;  // Add back the coupon value

        document.getElementById("orderTotal").textContent = `$${newTotal.toFixed(2)}`;
        document.getElementById("orderTotalHidden").value = newTotal.toFixed(2);

        localStorage.removeItem("CouponAmount");  // Remove any coupon amount stored
        localStorage.setItem("IsCouponApplied", "false");  // Reset coupon applied flag
        return;
    }

    if (isCouponApplied) {
        alert("Coupon already applied");
        return;
    }

    try {
        
        // Fetch the coupon details from the API
        const url = `https://localhost:7000/api/Coupon/GetCoupunByName/${couponApplied}`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();

            if (data.status === 1) {
                // Apply the coupon
                const couponAmount = parseFloat(data.amount) || 0;  // Ensure valid coupon amount
                const newTotal = originalTotal - couponAmount;

                document.getElementById("orderTotal").textContent = `$${newTotal.toFixed(2)}`;
                document.getElementById("orderTotalHidden").value = newTotal.toFixed(2);

                // Save coupon info to localStorage
                localStorage.setItem("CouponAmount", couponAmount);
                localStorage.setItem("CoponID",data.coponId)
                localStorage.setItem("IsCouponApplied", "true");

                alert("Coupon Applied Successfully!");
            } else {
                alert("Coupon is invalid or expired!");
            }
        } else {
            alert("Coupon not found!");
        }
    } catch (error) {
        console.error("Error applying coupon:", error);
        alert("An error occurred while applying the coupon.");
    }
}

async function SetPointsToZero() {
    
    const url = `https://localhost:7000/api/Users/SetPointsToZero/${userID}`;
    const response = await fetch(url, {
        method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
    } );
    
}