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
}


function showCart() {  
  var table = document.getElementById('cart');
    cart.items.forEach(cartItem => {
    var row = document.createElement('tr');
    row.id = `${cartItem.product.name}Row`;
    var deleteD = document.createElement('td');
    var quantity = document.createElement('td');
    var item = document.createElement('td');
    quantity.innerHTML = cartItem.quantity;
    item.innerHTML = cartItem.product.name;
    deleteD.innerHTML = 'X';
    row.appendChild(deleteD);
    row.appendChild(quantity);
    row.appendChild(item);
    table.appendChild(row);
    });

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
  clearCart();
  cart.saveToLocalStorage();
  renderCart();
}

// This will initialize the page and draw the cart on screen
renderCart();
