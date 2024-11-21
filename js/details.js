import { getProductById } from '../api/products.js';


function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('id'));
    return params.get('id');
}

async function displayProductDetails() {
    const productId = getProductIdFromURL();
    if (!productId) {
        console.error('ID-ul produsului lipsește!');
        return;
    }

    const product = await getProductById(productId);
    const container = document.querySelector('.container-product');

    container.innerHTML = `
        <div class="product-details">
            <img src="${product.imageURL}" alt="${product.name}" class="product-image">
            <h1>${product.name}</h1>
            <p class="product-description">${product.details}</p>
            <p class="product-price"><strong>Price:</strong> $${product.price}</p>
            <p class="product-category"><strong>Category:</strong>${product.category}</p>
            <p class="product-stock"><strong>In stock:</strong> ${product.stock}</p>
            <button class="add-to-cart-button">Add to Cart</button>
        </div>
    `;

    const addToCartButton = document.querySelector('.add-to-cart-button');
    addToCartButton.addEventListener('click', () => addToCart(product));
}

function addToCart(product) {
    // Preia coșul din localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    const message = document.createElement('div');
    message.className = 'cart-notification';
    message.textContent = `"${product.name}" a fost adăugat în coș!`;
    document.body.appendChild(message);

    setTimeout(() => {
        message.remove();
    }, 3000);
}

document.addEventListener('DOMContentLoaded', displayProductDetails);
