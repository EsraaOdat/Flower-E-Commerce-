async function Categories() {
    const url = 'https://localhost:7000/api/Categories_Bassam/GetAllCategories';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    var tbody = document.querySelector("tbody");
    let rowHTML = '';
    
    data.forEach(element => {
        rowHTML += `<tr>
                       
                        <td>
                          <input type="hidden" id="hidden" class="product-id" value="${element.category_id}">
                          <a href="#" class="text-inherit">
                            <div class="d-flex align-items-center">
                              <div>
                                <img src="../../../../../../../../../Back-End/E-Commerce/E-Commerce/uploads/${element.image}" alt=""
                                  class="img-4by3-md rounded">
                              </div>
                              <div class="ms-3">
                                <h5 class="mb-0 text-primary-hover">
                                  ${element.name}
                                </h5>
                              </div>
                            </div>
                          </a>
                        </td>
                        <td>
                          <span class="badge bg-success badge-dot me-1"></span>Active
                        </td>
                        <td >
                          ${element.description}
                        </td>
                        <td>
                          <span class="dropdown dropstart">
                            <a class="btn-icon btn btn-ghost btn-sm rounded-circle" href="#" role="button"
                              id="productDropdown1" data-bs-toggle="dropdown" data-bs-offset="-20,20"
                              aria-expanded="false">
                              <i class="fe fe-more-vertical"></i>
                            </a>
                            <span class="dropdown-menu" aria-labelledby="productDropdown1">
                              <span class="dropdown-header">Settings</span>
                              <a class="dropdown-item" href="#" onclick="navigateEdit(${element.categoryId})"><i
                                  class="fe fe-edit dropdown-item-icon" ></i>Edit</a>
                              <button class="dropdown-item" onclick="Delete(${element.categoryId})"><i
                                  class="fe fe-trash dropdown-item-icon"></i>Delete</button>
                            </span>
                          </span>
                        </td>
                      </tr>`;
    });

    // Set all rows in tbody after loop to avoid overwriting repeatedly
    tbody.innerHTML = rowHTML;
}

Categories();

function navigate() {
    window.location.href = "Create.html";
}

function navigateEdit(id) {
    // Save the category ID to localStorage and navigate to edit page
    localStorage.setItem('EditID', id);
    window.location.href = "editcategory.html";
}

async function Delete(id) {
    if (confirm("Are you sure you want to delete this category?")) {
        var url = `https://localhost:7000/api/Categories_Bassam/DeleteItem${id}`;
        
        try {
            var response = await fetch(url, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                console.log('Category deleted successfully');
                location.reload();
            } else {
                console.error('Failed to delete category');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
