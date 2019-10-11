/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
var table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
var cart;

function loadCart() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  var table = document.getElementById('cart');
  while(table.hasChildNodes()) table.removeChild(table.lastChild);
}


function showCart() {
  var table = document.getElementById('cart');

  cart.items.forEach(cartItem => {

    var row = document.createElement('tr');
    row.id = cartItem.product.product.name;
    var deleteD = document.createElement('td');
    deleteD.id = 'delete';
    var quantity = document.createElement('td');
    var item = document.createElement('td');
    quantity.innerHTML = cartItem.product.quantity;
    item.innerHTML = cartItem.product.product.name;
    deleteD.innerHTML = 'X';
    row.appendChild(deleteD);
    row.appendChild(quantity);
    row.appendChild(item);
    table.appendChild(row);
  });

}

function removeItemFromCart(event) {
  if(event.target.id === 'delete'){
    var id = event.target.parentNode.id;
    cart.items.forEach((prod) => {
      if(prod.product.product.name === id) {
        cart.removeItem(prod.product.product);
      }});
  }
  clearCart();
  cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
