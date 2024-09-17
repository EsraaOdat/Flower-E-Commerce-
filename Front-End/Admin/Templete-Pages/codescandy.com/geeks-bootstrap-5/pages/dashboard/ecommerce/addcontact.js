var n = Number(localStorage.getItem("contactId"));
var url = `https://localhost:7000/api/contactUs/adminForm/${n}`;
var url2 = `https://localhost:7000/api/contactUs/getFormById/${n}`;


async function getData() {
    ;
    var requist = await fetch(url2);
    let response = await requist.json();
    var test = document.getElementById("testForm")

    test.innerHTML = `
        <div class="card-body">
                <h4 class="mb-4">Customer Message</h4>

                    <!-- row -->
                  <div class="row gx-3">
                      <!-- input -->
                    <div class="mb-3 col-md-12">
                      <label class="form-label" for="firstName">Name</label>
                      <input type="text" class="form-control" placeholder="Enter first name" id="firstName" disabled value="${response.name}">
                    </div>
                      <!-- input -->
                    <div class="mb-3 col-md-12">
                      <label class="form-label" for="lastName">Email</label>
                      <input type="text" class="form-control" placeholder="Last Name" id="lastName"disabled value="${response.email}">

                    </div>
                      <!-- input -->
                    <div class="mb-3 col-md-6">
                      <label class="form-label" for="email">Subject</label>
                      <input type="email" class="form-control" placeholder="Enter email address" id="email" disabled value="${response.sub}">

                    </div>
                      <!-- input -->
                    <div class="mb-3 col-md-6">
                      <label class="form-label" for="phone">Date</label>
                      <input type="date" class="form-control" placeholder="Enter phone number" id="phone" disabled value="${response.sentDate}">
                    </div>
                    <div class="mb-3 col-md-12">
                        <label class="form-label" for="phone">Message</label>
                        <textarea class="form-control" placeholder="Enter your message" id="message" rows="4" disabled value="${response.message}">${response.message}</textarea>
                    </div>
                  </div>

              </div>
    `;
    
}
getData()

async function submitform(){
    ;
    event.preventDefault();
    var form = document.getElementById("formData");
    const formData = new FormData(form);
    var requist = await fetch(url,{
        method: "Put",
        body: formData
    });

    var data = requist;


    Swal.fire({
        position: "top",
        icon: "success",
        title: "An Email has been sent to Customer",
        showConfirmButton: false,
        timer: 1500
    });
    localStorage.removeItem("contactId");


    window.location.href = "contact.html";
} 