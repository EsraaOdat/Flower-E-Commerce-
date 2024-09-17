async function sendemail(event) {
    event.preventDefault();

    // API URL
    var url = 'https://localhost:7000/api/Users_Bassam/send';

    // Get the form data
    var form = document.getElementById("form");
    var formData = new FormData(form);

    try {
        // Send POST request with FormData
        var response = await fetch(url, {
            method: "POST", // Use POST to match your API method
            body: formData // Send FormData directly
        });

        // Check if the request was successful
        if (response.ok) {
            var result = await response.json();
            alert("Verification code sent successfully! OTP");
            localStorage.setItem("varificationId",result.userId);
            window.location.href="OTP.html";
        } else {
            throw new Error("Failed to send verification email.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error sending email: " + error.message);
    }
}
