import { fetchData } from "./api.js";
import { addToCart, updateCartBadge } from "./cart.js";
let allProducts =[];

async function init(){
    updateCartBadge();
    await loadCategories();
    await loadProducts();
    setupEventListeners();
}

async function loadCategories() {
    try{
        const categories = await fetchData(`/products/categories`);
        const filterSelect = document.getElementById(`category-filter`);
        categories.forEach(category => {
            const option = document.createElement(`option`);
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            filterSelect.appendChild(option);
            
        });
    }
    catch(err){
        console.error("Error loading categories");
    }
}
async function loadProducts() {
    const spinner = document.getElementById(`loading-spinner`);
    const errorAlert = document.getElementById(`error-message`);
    try{
        const products = await fetchData(`/products`);  
        allProducts = products;
        renderProduct(products);
        spinner.classList.add(`d-none`);
    }catch{
        spinner.classList.add(`d-none`);
        errorAlert.classList.remove(`d-none`);
    }
    

}

function renderProduct(products){
    const container = document.getElementById(`product-list`);
    container.innerHTML=``;
    if(products.length == 0){
        container.innerHTML = `<p class="text-center" text-muted my-5 col-12">
        No products found matching your search.</p>`;
        return;
    }
    products.forEach(product =>{
        const card = document.createElement(`div`);
        card.className = `product-card`;
        card.innerHTML=`
        
    <div>
        <div class="product-img-container">
            <img src="${product.image}" alt="${product.title}" loading="lazy">

        </div>
        <div class="p-3">
            <small class="text-muted text-uppercase d-block mb-1">${product.category}</small>
            <h5 class="card-title text-truncate fs-6" title="${product.title}">
                ${product.title}
            </h5>
             <p class="text-danger fw-bold fs-5 mb-0">$${product.price.toFixed(2)}</p>

        </div>
    </div>
    <div class="p-3 border-top bg-light">
        <div class="row" g-2>
            <div class="col-6">
                <a href="product.html?id=${product.id}" class="btn btn-outline-secondary btn-sm w-100">
                    View details
                </a>

            </div>
            <div class="col-6">
                <button class="btn btn-primary btn-sm w-100 btn-add-cart" data-id="${product.id}">
                     Add to Cart
                </button>
            </div>
        </div>
    </div>
        `;
        container.appendChild(card);
    })

}

function setupEventListeners(){
    const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  const priceSort = document.getElementById('price-sort');

  function filterAndSort(){
    let filtered = [...allProducts];
    const keyword = searchInput.value.toLowerCase().trim();
    if(keyword!==``){
        filtered = filtered.filter(p => p.title.toLowerCase().includes(keyword));
    }
     const category = categoryFilter.value;
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    const sortValue = priceSort.value;
    if(sortValue == 'low-high'){
        filtered.sort((a,b) => a.price - b.price);
    }else if (sortValue === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }
     renderProduct(filtered);
  }
    searchInput.addEventListener('input', filterAndSort);
  categoryFilter.addEventListener('change', filterAndSort);
  priceSort.addEventListener('change', filterAndSort);

  document.getElementById(`product-list`).addEventListener(`click`,(e)=>{
 if (e.target.classList.contains('btn-add-cart')) {
      const productId = parseInt(e.target.getAttribute('data-id'));
      const product = allProducts.find(p => p.id === productId);
      if (product) {
        addToCart(product);
        alert(`Added "${product.title}" to cart successfully!`);
      }
    }    
  })

}
document.addEventListener('DOMContentLoaded', init);
