async function changepassword(event) {
    event.preventDefault();
    
    // Get the stored verification ID from localStorage
    var id = localStorage.getItem("varificationId");
    
    // Construct the API URL with the ID as a query parameter
    var url = `https://localhost:7000/api/Users_Bassam/editPassword?id=${id}`;
    
    // Get the form element
    var form = document.getElementById("form1");
    
    // Create FormData from the form
    var formData = new FormData(form);

    try {
        // Send PUT request with FormData
        var response = await fetch(url, {
            method: "PUT",
            body: formData
        });

        // Check if the request was successful
        if (response.ok) {
            var result = await response.json();
            window.location.href = "login.html";
            alert("Password changed successfully!");
        } else {
            throw new Error("Failed to change password.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error changing password: " + error.message);
    }
}
