export function getCart(){
    return JSON.parse(localStorage.getItem(`cart`)) || [];
}

export function saveCart(cart){
    localStorage.setItem(`cart`,JSON.stringify(cart));
    updateCartBadge();
}

export function addToCart(product){
    let cart = getCart();
    const existingItem = cart.find(item => item.id == product.id);
    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            id : product.id,
            title : product.title,
            price : product.price,
            image : product.image,
            quantity : 1
        })
    }
    saveCart(cart);
}

export function updateCartBadge(){
    const badge = document.getElementById(`cart-badge`);
    if(!badge) return;
    const cart = getCart();
    const count = cart.reduce((total,item) => total + item.quantity,0);
    if(count > 0){
        badge.textContent = count;
        badge.classList.remove(`d-none`);
    }else{
        badge.classList.add(`d-none`);
    }
}

function init() {
  renderCart();
  setupEventListeners();
}

function renderCart() {
  const cart = getCart();
  const emptyState = document.getElementById('empty-cart-state');
  const cartContent = document.getElementById('cart-content');
  const itemsContainer = document.getElementById('cart-items-container');

  updateCartBadge();

  if (cart.length === 0) {
    emptyState.classList.remove('d-none');
    cartContent.classList.add('d-none');
    return;
  }

  emptyState.classList.add('d-none');
  cartContent.classList.remove('d-none');

  itemsContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    const row = document.createElement('div');
    row.className = 'row align-items-center py-3 border-bottom';
    row.innerHTML = `
      <div class="col-3 col-md-2">
        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded" style="max-height: 80px; object-fit: contain;">
      </div>
      <div class="col-9 col-md-4">
        <h6 class="mb-1 text-truncate">${item.title}</h6>
        <p class="mb-0 text-muted small">Unit Price: $${item.price.toFixed(2)}</p>
      </div>
      <div class="col-6 col-md-3 mt-3 mt-md-0">
        <div class="input-group input-group-sm" style="max-width: 120px;">
          <button class="btn btn-outline-secondary btn-decrease" data-id="${item.id}">-</button>
          <span class="form-control text-center bg-light">${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-increase" data-id="${item.id}">+</button>
        </div>
      </div>
      <div class="col-4 col-md-2 mt-3 mt-md-0 text-md-end fw-bold text-dark">
        $${itemTotal.toFixed(2)}
      </div>
      <div class="col-2 col-md-1 mt-3 mt-md-0 text-end">
        <button class="btn btn-link text-danger btn-remove p-0" data-id="${item.id}">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  document.getElementById('subtotal-price').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('total-price').textContent = `$${subtotal.toFixed(2)}`;
}

function setupEventListeners() {
  const container = document.getElementById('cart-items-container');

  container.addEventListener('click', (e) => {
    let cart = getCart();
    
    const btnIncrease = e.target.closest('.btn-increase');
    const btnDecrease = e.target.closest('.btn-decrease');
    const btnRemove = e.target.closest('.btn-remove');

    if (btnIncrease) {
      const id = parseInt(btnIncrease.getAttribute('data-id'));
      const item = cart.find(i => i.id === id);
      if (item) item.quantity += 1;
      saveCart(cart);
      renderCart();
    }

    if (btnDecrease) {
      const id = parseInt(btnDecrease.getAttribute('data-id'));
      const item = cart.find(i => i.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        cart = cart.filter(i => i.id !== id);
      }
      saveCart(cart);
      renderCart();
    }

    if (btnRemove) {
      const id = parseInt(btnRemove.getAttribute('data-id'));
      cart = cart.filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
    }
  });

  document.getElementById('btn-clear-cart').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      saveCart([]);
      renderCart();
    }
  });

  document.getElementById('btn-checkout').addEventListener('click', () => {
    alert("Thank you for your order! Checkout integration is coming soon.");
    saveCart([]);
    renderCart();
  });
}

document.addEventListener('DOMContentLoaded', init);