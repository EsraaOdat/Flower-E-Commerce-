async function addcategory(event) {
    event.preventDefault();  // Prevent form submission from reloading the page

    var url = `https://localhost:7000/api/Categories_Bassam`;  // API URL
    var form = document.getElementById("form");  // Get the form element
    var formData = new FormData(form);  // Create FormData from the form

    try {
        var response = await fetch(url, {
            method: "POST",
            body: formData  // Send form data in the body
        });

        // Check if the request was successful
        if (response.ok) {
            alert('Category added successfully');
            window.location.href = "categories.html";  // Redirect to categories page
        } else {
            // Handle error response
            var errorData = await response.json();
            console.error("Error adding category:", errorData);
            alert('Failed to add category: ' + (errorData.message || 'Unknown error'));
        }
    } catch (error) {
        console.error("Error:", error);
        alert('An error occurred while adding the category');
    }
}
