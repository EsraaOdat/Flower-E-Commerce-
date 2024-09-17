async function CartNavBar() {
    var requist = await fetch('https://localhost:7000/api/Home/getAllCategories')
    var responce = await requist.json();
    
}