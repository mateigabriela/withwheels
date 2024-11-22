function getCartProducts() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCartProducts(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function displayCart() {
    const cart = getCartProducts();
    const cartContainer = document.querySelector('.cart-container');

    if (!cart.length) {
        cartContainer.innerHTML = '<p>Coșul este gol!</p>';
        return;
    }

    cartContainer.innerHTML = cart.map(product => `
        <div class="cart-item">
            <img src="${product.imageURL}" alt="${product.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${product.name}</h3>
                <p>Price: $${product.price}</p>
                <p>Total: $${(product.price * product.quantity).toFixed(2)}</p>
                <label>
                    Quantity:
                    <input type="number" class="quantity-input" data-product-id="${product.id}" value="${product.quantity}" min="1">
                </label>
                <button class="delete-button" data-product-id="${product.id}">Delete</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', (e) => deleteProductFromCart(e.target.dataset.productId));
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', (e) => updateProductQuantity(e.target.dataset.productId, e.target.value));
    });
}

function deleteProductFromCart(productId) {
    let cart = getCartProducts();
    cart = cart.filter(product => product.id !== productId);
    saveCartProducts(cart);
    displayCart();
}

function updateProductQuantity(productId, quantity) {
    let cart = getCartProducts();
    const product = cart.find(product => product.id === productId);
    if (product) {
        product.quantity = parseInt(quantity, 10) || 1; 
        saveCartProducts(cart);
        displayCart();
    }
}

document.addEventListener('DOMContentLoaded', displayCart);