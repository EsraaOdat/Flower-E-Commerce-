var contactForm = document.getElementById('contact-form');

async function submitform(){
    ;
    event.preventDefault();
    if (contactForm.reportValidity()) {
        // Proceed with form submission if valid
        const formData = new FormData(contactForm);

    var requist = await fetch("https://localhost:7000/api/contactUs/userForm",{
        method: "POST",
        body: formData
    });

    var data = requist;

    Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Thank You For Conntacting Us We Will Answer You Shortly",
        showConfirmButton: false,
        timer: 2500
      });
      // Clear form fields after submission
      contactForm.reset();
      // Redirect to thank you page or whatever else you want to do after form submission
       
    } else {
        // Handle validation failure (e.g., display error message)
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter all required fields",
          });
    }
    
    
} 