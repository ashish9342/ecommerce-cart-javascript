import text from "./../../../configs/text";

function cart() {
  document.getElementById("cart").innerHTML = `
  <div class="cart">
    <h2 class="section-header">${text?.cart}</h2>
    <div class="cart-row">
      <span class="cart-item cart-header cart-column">${text.item}</span>
      <span class="cart-price cart-header cart-column">${text.price}</span>
      <span class="cart-quantity cart-header cart-column">${text.quantity}</span>
    </div>
    <div class="cart-items">


    </div>
    <div class="cart-total">
      <p class="cart-total-title">${text.total}</p>
      <p class="">${text.items} : <span class="items-count">0</span>  </p>
      <p class="">${text.discount} : <span class="items-discount"> 0</span></p>
      <p class="bg-grey">${text.orderTotal} : <span class="cart-total-price">$ 0</span></p>
    </div>
</div>`;
}
export default cart;
