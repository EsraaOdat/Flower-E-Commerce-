async function getAllContact() {
    

    var requist = await fetch('https://localhost:7000/api/contactUs/getAllContact');
    var response = await requist.json();

    var getAll = document.getElementById("getAllContact");

    response.forEach(element => {
        getAll.innerHTML += `
            <tr>
                
                <td>
                    <div class="d-flex align-items-center">
                        <div class="ms-3">
                        <h5 class="mb-0 text-primary-hover">
                           ${element.name}

                        </h5>

                        </div>
                    </div>
                    
                </td>
                
                <td>
                    ${element.email}
                </td>
                <td>
                    ${element.sub}
                </td>
                <td>
                    ${element.sentDate}
                </td>
                <td>
                    <span class="badge ${element.status == 0 ? 'bg-info' : 'bg-success'} badge-dot me-1"></span>${element.status == 0 ? 'Unanswered' : 'Answered'}
                </td>

                <td>
                    <span class="dropdown dropstart" >
                    <a class="btn-icon btn btn-ghost btn-sm rounded-circle" href="#" role="button"
                        id="productDropdown8" data-bs-toggle="dropdown" data-bs-offset="-20,20"
                        aria-expanded="false"
                        onclick="contactId(${element.contactId},${element.status})"
                        >
                        <i class="fa-solid fa-reply"></i>
                    </a>
                    </span>
                </td>
                </tr>
        `
        
    });

}

getAllContact();

async function getContactByStatus() {

    

    var requist = await fetch('https://localhost:7000/api/contactUs/getContactByStatus');
    var response = await requist.json();

    var getAll = document.getElementById("getContactByStatus");

    response.forEach(element => {
        getAll.innerHTML += `
            <tr>
                
                <td>
                    <div class="d-flex align-items-center">
                        <div class="ms-3">
                        <h5 class="mb-0 text-primary-hover">
                           ${element.name}

                        </h5>

                        </div>
                    </div>
                    
                </td>
                
                <td>
                    ${element.email}
                </td>
                <td>
                    ${element.sub}
                </td>
                <td>
                    ${element.sentDate}
                </td>
                <td>
                    <span class="badge ${element.status == 0 ? 'bg-info' : 'bg-success'} badge-dot me-1"></span>${element.status == 0 ? 'Unanswered' : 'Answered'}
                </td>

                <td>
                    <span class="dropdown dropstart" >
                    <a class="btn-icon btn btn-ghost btn-sm rounded-circle" href="addcontact.html" role="button"
                        id="productDropdown8" data-bs-toggle="dropdown" data-bs-offset="-20,20"
                        aria-expanded="false"
                        onclick="contactId(${element.contactId},${element.status})"
                        >
                        <i class="fa-solid fa-reply"></i>
                    </a>
                    </span>
                </td>
                </tr>
        `
        
    });
    
}

getContactByStatus();

function contactId(data, status) {
    ;
    if (status == 0){
        localStorage.setItem("contactId", data);
        window.location.href = "addcontact.html";
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You Already Answered This Message",
          });
    }

 }