import { getProductById } from "../api/products.js";

document.addEventListener("DOMContentLoaded", async () => {
    // Preia ID-ul din URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        // Încarcă detaliile produsului
        const product = await getProductById(productId);

        // Afișează detaliile produsului în pagină
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-price").textContent = `$${product.price}`;
        document.getElementById("product-description").textContent = product.details;
        document.getElementById("product-image").src = product.imageURL;
    } else {
        alert("Product not found!");
    }
});
