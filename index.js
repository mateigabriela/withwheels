import { getAllProducts } from "./api/products.js";
import { mapProductToCard } from "./utils/layout.js";

const URL = "https://673e4c440118dbfe860ada71.mockapi.io/products"
const cardContainer =document.querySelector(".card-container");

document.addEventListener("DOMContentLoaded", displayProducts);

async function displayProducts() {
    const products = await getAllProducts();
    
            cardContainer.innerHTML = products.map(mapProductToCard).join('');
}
