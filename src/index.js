import "./styles.css";
// import data from "../data/data";
import text from "../configs/text";
import CONFIG from "../configs/config";
import products from "./components/products/products";
import cart from "./components/cart/cart";
import header from "./components/header/header";
import Toast from "./components/toast/toast";

const ecomm = {
  renderProducts: async () => {
    document.getElementById("productCatalouge").innerHTML = text.loading;
    try {
      const response = await fetch(CONFIG.url);
      const data = await response.json();
      // console.log("data", data);
      products(data.items);
      ecomm.addEventListener();
    } catch (e) {
      document.getElementById("productCatalouge").innerHTML = text.errorAPI;
      console.log("Error : ", e.message);
    }
  },
  renderCart: () => {
    header();
    cart();
  },
  renderToast: (title) => {
    Toast(title);
    // hide
    setTimeout(function () {
      document.getElementsByClassName("toast")[0].remove();
    }, 1000);
  },
  addEventListener: () => {
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (let i = 0; i < removeCartItemButtons.length; i++) {
      let button = removeCartItemButtons[i];
      button.addEventListener("click", ecomm.removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
      let input = quantityInputs[i];
      input.addEventListener("change", ecomm.quantityChanged);
    }

    let addToCartButtons = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCartButtons.length; i++) {
      let button = addToCartButtons[i];
      button.addEventListener("click", ecomm.addToCartClicked);
    }
  },
  removeCartItem: (event) => {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    ecomm.updateCartTotal();
  },
  quantityChanged: (event) => {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    ecomm.updateCartTotal();
  },
  addToCartClicked: (event) => {
    // let discount = 0;
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    let orgPrice = shopItem.getElementsByClassName("shop-item-display")[0]
      .innerText;
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
    // discount = orgPrice - price;
    // console.log(discount);
    ecomm.addItemToCart(title, price, imageSrc, orgPrice);
    ecomm.updateCartTotal();
    // show toast
  },
  addItemToCart: (title, price, imageSrc, orgPrice) => {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");
    for (let i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText === title) {
        alert("This item is already added to the cart");
        return;
      }
    }
    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <input class="cart-org-price" type="hidden" value="${orgPrice}">
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", ecomm.removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", ecomm.quantityChanged);

    ecomm.renderToast(title);
  },
  updateTotalItemsAndDiscount: (cartRows) => {
    let count = 0,
      discount = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0]
        .innerText;
      let orgPrice = cartRow.getElementsByClassName("cart-org-price")[0].value;
      let quantity = quantityElement.value;
      discount += (parseFloat(orgPrice) - parseFloat(priceElement)) * quantity;
      console.log(discount, priceElement, orgPrice);

      count += parseFloat(quantity);
    }
    console.log("discount", discount);
    document.getElementsByClassName("items-discount")[0].innerText = discount;
    document.getElementsByClassName("items-count")[0].innerText = count;
  },
  updateCartTotal: () => {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
      let cartRow = cartRows[i];
      let priceElement = cartRow.getElementsByClassName("cart-price")[0];
      let quantityElement = cartRow.getElementsByClassName(
        "cart-quantity-input"
      )[0];
      let price = parseFloat(priceElement.innerText.replace("$", ""));
      let quantity = quantityElement.value;

      total = total + price * quantity;
    }
    ecomm.updateTotalItemsAndDiscount(cartRows);
    // ecomm.updateDiscount(cartRows);
    document.getElementsByClassName("cart-total-price")[0].innerText =
      "$" + total;
  },
  render: () => {
    ecomm.renderCart();
    ecomm.renderProducts();
  }
};

ecomm.render();
