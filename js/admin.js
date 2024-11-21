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
               <button data-productId=${product.id}>Edit<button>
            </td>
            <td>
               <button data-productId=${product.id}>Delete<button>
            </td>
            </tr>
    `).join(""))
}


//save new product

const nameInput = document.getElementById("name");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("image-url");
const categoryInput = document.getElementById("category");
const detailsInput = document.getElementById("details");
const saveProductBtn = document.getElementById("save-btn");

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

    fetch(URL, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

    
}

