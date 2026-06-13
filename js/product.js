import { fetchData } from './api.js';
import { addToCart, updateCartBadge } from './cart.js';


let currentProduct = null;
async function init() {
    updateCartBadge();
    const param = new URLSearchParams(window.location.search);
    const id = param.get(`id`);
    if(!id){
        showError();
        return;
    }
    await loadProductDetails(id);
}
async function loadProductDetails(id) {
    const spinner = document.getElementById('loading-spinner');
     const detailContainer = document.getElementById('product-detail');
    try{
    currentProduct = await fetchData(`/products/${id}`);
    if(!currentProduct){
        showError();
        return;
    }
    document.getElementById('detail-img').src = currentProduct.image;
    document.getElementById('detail-img').alt = currentProduct.title;
    document.getElementById('detail-category').textContent = currentProduct.category;
    document.getElementById('detail-title').textContent = currentProduct.title;
    document.getElementById('detail-price').textContent = `$${currentProduct.price.toFixed(2)}`;
    document.getElementById('detail-desc').textContent = currentProduct.description;
    const rating = currentProduct.rating;
    document.getElementById('detail-rating-stars').innerHTML = getRatingStars(rating.rate);
    document.getElementById('detail-rating-text').textContent = `(${rating.rate} / 5, based on ${rating.count} reviews)`;

    spinner.classList.add('d-none');
    detailContainer.classList.remove('d-none');

    document.getElementById('btn-add-to-cart').addEventListener('click', () => {
      addToCart(currentProduct);
      alert("Added product to cart successfully!");
  });
}catch(err){
    showError();
}
}
function getRatingStars(rate) {
  const fullStars = Math.round(rate);
  let starsHtml = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      starsHtml += '<i class="bi bi-star-fill"></i>';
    } else {
      starsHtml += '<i class="bi bi-star"></i>';
    }
  }
  return starsHtml;
}

function showError() {
  document.getElementById('loading-spinner').classList.add('d-none');
  document.getElementById('error-message').classList.remove('d-none');
}

document.addEventListener('DOMContentLoaded', init);
