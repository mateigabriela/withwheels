const URL = "https://673e4c440118dbfe860ada71.mockapi.io/products"

export async function getAllProducts() {
    const response = await fetch(URL);
    const products = await response.json();

    return products;
    
}

export async function getProductById(id) {
    const response = await fetch(`${URL}/${id}`);
    const product = response.json();

    return product;
}

export async function addNewProduct(product) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    const newProduct =await response.json();
    return newProduct;
}

export async function updateProduct(product, id) {
    const response =await fetch(`${URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })

    const editedProduct = await response.json();
    return editedProduct;
}

export async function deleteProduct(id) {
    await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
}