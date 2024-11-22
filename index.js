import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

const URL = "https://673e4c440118dbfe860ada71.mockapi.io/products"
const cardContainer = document.querySelector(".card-container");
const sortSelect = document.getElementById('sort-select');

document.addEventListener("DOMContentLoaded", displayProducts);

sortSelect.addEventListener('change', (event) => {
    const selectedOrder = event.target.value;
    displaySortedProducts(selectedOrder);
});

async function displayProducts() {
    const products = await getAllProducts();
    cardContainer.innerHTML = products.map(mapProductToCard).join('');
}

async function displaySortedProducts(order) {
    const products = await getAllProducts();

    const sortedProducts = products.sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price; 
        } else {
            return b.price - a.price; 
        }
    });

    cardContainer.innerHTML = sortedProducts.map(mapProductToCard).join('');
}
