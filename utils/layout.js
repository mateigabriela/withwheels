export function mapProductToCard(product) {
    return `
                <div class="card">
                    <div class="card-background" style="background-image: url('${product.imageURL}');">
                    </div>
                    <div class="content">
                        <div class="card-price">$${product.price}</div>
                        <h3 class="card-name">${product.name}</h3>
                    </div>
                </div>
            ` ;
}

export function mapProductToAdminTableRow (product) {
    return ` <tr>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><img width="50px" src =${product.imageURL}></td>
            <td>${product.category}</td>
            <td>${product.details}</td>
            <td>
               <button class="edit-button" data-productId=${product.id}>Edit<button>
            </td>
            <td>
               <button class="delete-button" data-productId=${product.id}>Delete<button>
            </td>
            </tr>` ;
}