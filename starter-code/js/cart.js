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
  if(cart.items.length > 0){
    cart.items.forEach(cartItem => {
      var row = document.createElement('tr');
      row.id = cartItem.product.name;
      var deleteD = document.createElement('td');
      deleteD.id = 'delete';
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
}

function removeItemFromCart(event) {
  if(event.target.id === 'delete'){
    var id = event.target.parentNode.id;
    cart.items.forEach((prod) => {
      if(prod.product.name === id) {
        cart.removeItem(prod.product.product);
      }});
  }
  clearCart();
  cart.saveToLocalStorage();
  renderCart();
}
var orderForm = {

  form: document.createElement('form'),

  renderForm: function(){
    this.assembleForm();
    var main = document.getElementsByTagName('main')[0];
    main.appendChild(this.form);
  },  
  assembleInputLabel: function(label, inputType, content){
    var labelE = document.createElement('label');
    labelE.for = label;
    labelE.innerHTML = content;
    var inputE = document.createElement('input');
    inputE.name = label;
    inputE.type = inputType;
    return [labelE, inputE];
  },
  // name, city, street, state, zip, phone number, number>cardnumber
  assembleForm: function(){
    var fields = [];
    fields.push(this.assembleInputLabel('name', 'text', 'Name:'));
    fields.push(this.assembleInputLabel('street', 'text', 'Street:'));
    fields.push(this.assembleInputLabel('city', 'text', 'City:'));
    fields.push(this.assembleInputLabel('state', 'text', 'State:'));
    fields.push(this.assembleInputLabel('zip', 'text', 'Zip:'));
    fields.push(this.assembleInputLabel('phone','text','Phone:'));

    // Assinment doc says use input of type, "number". Makes no sense but I've done it.
    fields.push(this.assembleInputLabel('card', 'number', 'Card:'));

    fields.forEach(field => {
      this.form.appendChild(field[0]);
      this.form.appendChild(field[1]);
    });
    var submit = document.createElement('input');
    submit.type = 'submit';
    this.form.appendChild(submit);
  }
};



// This will initialize the page and draw the cart on screen
renderCart();
orderForm.renderForm();


