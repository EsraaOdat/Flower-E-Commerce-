async function getCategry() {
    let EditID = Number(localStorage.getItem('EditID'));
    const url = `https://localhost:7000/api/Categories_Bassam/getCategoryById/${EditID}`;

    var request = await fetch(url);
    var response = await request.json();
    var name = document.getElementById("name")
    name.value = response.name;
    var description = document.getElementById("description")
    description.value = response.description;

    
}
getCategry();


async function editcategory(event) {
    event.preventDefault();
    let EditID = Number(localStorage.getItem('EditID'));

    const url = `https://localhost:7000/api/Categories_Bassam/GetCategoryById/${EditID}`;
var form=document.getElementById("form");
    const formData = new FormData(form);
    console.log(formData);

  const response = await fetch(url, {
        method: 'PUT',
        body:formData
    });
    console.log(response);

    if (response.ok) {
        const data = await response.json();
        console.log('Category updated successfully:', data);
    } else {
        console.error('Failed to update category:', response.status, response.statusText);
    }

    window.location.href="categories.html";
}