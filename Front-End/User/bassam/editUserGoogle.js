async function CreatePassword(event) {
    event.preventDefault();  // Prevent form submission and page reload
    ;
    var url = 'https://localhost:7000/api/Users_Bassam/CreatePassword';
    var data = JSON.parse(localStorage.getItem("user"));
    if (!data || !data.displayName) {
        alert('User data is missing. Please log in again.');
        return;
    }
    

    var form = document.getElementById("passwordForm");
    var formData = new FormData();
    var password1 = document.getElementById("new_password").value;
    var password2 = document.getElementById("confirm_password").value;
    formData.append('displayName', data.displayName);
    if (password1 !== password2) {
        alert("Passwords do not match");
        return;
    }

    formData.append('Password', password1);


    try {
        var response = await fetch(url, {
            method: "POST",
            body: formData,
        });
        var dataUser= await response.json();
        localStorage.setItem("userID",dataUser.userId);


        if (response.ok) {
            debugger;
             clearCartFromLocalStorage(dataUser.userId);
             window.location.href = "../FawarehWork/cart.html"; 
            alert('Password changed successfully');
        } else {
            const errorData = await response.json();
            alert('Error: ' + (errorData.message || 'Password change failed'));
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while changing the password. Please try again.');
    }
}

async function clearCartFromLocalStorage(userID){
    debugger;
    var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems.forEach(async element => {
        debugger;
        var requist = await fetch('https://localhost:7000/api/Cart/CreateNewCartItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: element.productId,
                userId: userID,
                quantity: element.quantity
    
            })
        });
        
    });

    localStorage.removeItem('cart');

 
}