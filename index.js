const URL = "https://673e4c440118dbfe860ada71.mockapi.io/products"
const cardContainer =document.querySelector(".card-container");

document.addEventListener("DOMContentLoaded", displayProducts);

function displayProducts() {
    fetch(URL)
        .then(response => response.json())
        .then(products => {
            // Găsește containerul
            const cardContainer = document.querySelector('.card-container');
            
            // Înlocuiește conținutul existent
            cardContainer.innerHTML = products.map((product) => `
                <div class="card">
                    <div class="card-background" style="background-image: url('${product.imageURL}');">
                    </div>
                    <div class="content">
                        <div class="card-price">$${product.price}</div>
                        <h3 class="card-name">${product.name}</h3>
                    </div>
                </div>
            `).join('');

            // Forțează browser-ul să recalculeze stilurile
            requestAnimationFrame(() => {
                cardContainer.querySelectorAll('.card').forEach(card => {
                    card.classList.add('card-styling');
                });
            });
        });
}
