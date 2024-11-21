const productsTableBody = document.getElementById("products-table").querySelector("tbody");
const URL = "https://673e4c440118dbfe860ada71.mockapi.io/products"
document.addEventListener("DOMContentLoaded", displayProducts);

function displayProducts() {
    fetch(URL)
    .then((response) => response.json())
    .then(
        (products) => 
            productsTableBody.innerHTML = products.map(
                (product) => `
            <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img width="50px" src =${product.imageURL}></td>
            <td>${product.category}</td>
            <td>${product.details}</td>
            <td>
               <button class="edit-button" data-productId=${product.id}>Edit<button>
            </td>
            <td>
               <button class="delete-button" data-productId=${product.id}>Delete<button>
            </td>
            </tr>
    `).join(""))
}


//save new product
const form = document.getElementById("product-form");
const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const categoryInput = document.getElementById("category");
const detailsInput = document.getElementById("details");
const saveProductBtn = document.getElementById("save-btn");
let currentEditableProductID;
let editMode=false;

saveProductBtn.addEventListener("click", saveProduct);

function saveProduct(event) {
    event.preventDefault();
    const product = {
        name: nameInput.value,
        price: Number(priceInput.value),
        imageURL: imageUrlInput.value,
        category: categoryInput.value,
        details: detailsInput.value
    };

    if(editMode) {
        fetch(`${URL}/${currentEditableProductID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(() => {
            form.reset();
            displayProducts();
            editMode=false;
    })
    } else {
    fetch(URL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(()=> displayProducts());
    }
    
}

productsTableBody.addEventListener("click", handleActions);

function handleActions(event) {
    if(event.target.classList.contains("edit-button")) {
        currentEditableProductID = event.target.getAttribute("data-productId");
        fetch(`${URL}/${currentEditableProductID}`)
        .then((response) => response.json())
        .then((product) => {
            nameInput.value = product.name;
            priceInput.value = product.price;
            imageUrlInput.value = product.imageURL;
            categoryInput.value = product.category;
            detailsInput.value = product.details;
        });
        editMode=true;
    } else if (event.target.classList.contains("delete-button")) {
        const id = event.target.getAttribute("data-productId");
        fetch(`${URL}/${id}`, {
            method: 'DELETE',
        }).then(() => displayProducts());
    }
    
}