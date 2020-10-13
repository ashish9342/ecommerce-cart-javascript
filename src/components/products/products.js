import text from "./../../../configs/text";

function produtcs(products) {
  document.getElementById("productCatalouge").innerHTML = products
    .map(
      (product) =>
        `<div class="product shop-item">
        <div class="img-holder">
          <img class="shop-item-image" src="${product?.image}">
          <span class="discount">${product?.discount + text?.off}</span>
        </div>
    
        <h4 class="shop-item-title">${product?.name}</h4>

        <div class="shop-item-details">
            <span class="shop-item-display">${product?.price?.display}</span>
            <span class="shop-item-price">${product?.price?.actual}</span>
            <button class="btn btn-primary shop-item-button" type="button">
            ${text?.addToCart}
            </button>
        </div>
      </div>`
    )
    .join("");
}
export default produtcs;
