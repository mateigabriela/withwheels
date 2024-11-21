import { getAllProducts, getProductById, deleteProduct, updateProduct, addNewProduct } from "../api/products.js";
import { mapProductToAdminTableRow } from "../utils/layout.js";
const productsTableBody = document.getElementById("products-table").querySelector("tbody");

document.addEventListener("DOMContentLoaded", displayProducts);
async function displayProducts() {
    const products = await getAllProducts();
    productsTableBody.innerHTML = products.map(mapProductToAdminTableRow).join("");
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

async function saveProduct(event) {
    event.preventDefault();
    const product = {
        name: nameInput.value,
        price: Number(priceInput.value),
        imageURL: imageUrlInput.value,
        category: categoryInput.value,
        details: detailsInput.value
    };

    if(editMode) {
        const editedProduct = await updateProduct(product, currentEditableProductID);
        if(editedProduct !== null) {
            form.reset();
            await displayProducts();
            editMode=false;
        }
    } else {
    const newProduct = await addNewProduct(product);
    if(newProduct !== null) {
        form.reset();
        await displayProducts();
    }
}}

productsTableBody.addEventListener("click", handleActions);

async function handleActions(event) {
    if(event.target.classList.contains("edit-button")) {
        currentEditableProductID = event.target.getAttribute("data-productId");
        const currentProduct = await getProductById(currentEditableProductID);
        
            nameInput.value = currentProduct.name;
            priceInput.value = currentProduct.price;
            imageUrlInput.value = currentProduct.imageURL;
            categoryInput.value = currentProduct.category;
            detailsInput.value = currentProduct.details;
            editMode=true;

    } else if (event.target.classList.contains("delete-button")) {
        const id = event.target.getAttribute("data-productId");
        await deleteProduct(id);
        await displayProducts();
    }
    
}