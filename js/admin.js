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