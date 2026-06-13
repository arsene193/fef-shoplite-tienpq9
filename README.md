<img width="1786" height="645" alt="image" src="https://github.com/user-attachments/assets/79cfaa8b-8bd8-445b-9630-8f94536c6178" /># ShopLite - Mini E-Commerce Website

ShopLite is a client-side multi-page e-commerce application that fetches real-time product data. This project demonstrates responsive layouts using CSS Flexbox/Grid alongside native JavaScript DOM and State management.

- **Demo URL:** [https://fef-shoplite-tienpq9.vercel.app](https://fef-shoplite-tienpq9.vercel.app/)
- **GitHub Repository:** [https://github.com/arsene193/fef-shoplite-tienpq9](https://github.com/arsene193/fef-shoplite-tienpq9)

## 📸 Screenshots
- **Homepage:**

  <img width="1786" height="645" alt="image" src="https://github.com/user-attachments/assets/6ad85187-894d-41a5-9627-fffb9a1cbd98" />

- **List Products:**

  <img width="1782" height="735" alt="image" src="https://github.com/user-attachments/assets/22660e7a-ece3-4d1d-a4b0-60855b643ed3" />

- **Product Details:**

  <img width="1606" height="737" alt="image" src="https://github.com/user-attachments/assets/fdf7a531-8ee1-4aec-aefc-63f8cac7d196" />

- **Add To Cart:**

  <img width="1763" height="691" alt="image" src="https://github.com/user-attachments/assets/e504fe96-1721-41ae-9cb9-a1eeb6f2c3f5" />
  
- **Register:**

  <img width="754" height="784" alt="image" src="https://github.com/user-attachments/assets/a69c0689-074a-440f-93cf-878492ca88e4" />


## 🛠️ Local Run Instructions

To run this project locally on your machine:
1. Clone the repository:
   ```bash
   git clone https://github.com/arsene193/fef-shoplite-tienpq9.git
2. Navigate into the project folder:
    ```bash
    cd fef-shoplite-tienpq9
3. Open index.html with a local server environment (e.g., using VS Code Live Server extension) to avoid CORS or ES Module restrictions in browser.

## 📝 Features Checklist (Self-Evaluation)

### 🟢 Pass Tier (Completed)
* [x] **All 4 pages linked via shared navbar**: Seamless navigation between Home, Details, Cart, and Register pages.
* [x] **Semantic HTML layout**: Proper use of standard tags including `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` instead of overusing `<div>`.
* [x] **Home page fetching & dynamic rendering**: Product grid items are fetched asynchronously from the  API.
* [x] **Product detail page**: Dynamically extracts the product ID via URL Query Strings to fetch and display unique item details.
* [x] **Registration Form Validation**: Clean, custom JavaScript checks for required inputs, password length, phone patterns, and email formats .
* [x] **Basic Responsiveness**: Optimized structure preventing layout breakage on mobile (≤576px), tablet, and desktop viewports.

### 🟡 Good Tier (Completed)
* [x] **Full Cart features**: Add, remove, increase/decrease quantities, and auto-calculate the total price stored persistently across sessions using `localStorage`.
* [x] **Filter and Search**: Seamless instant search functionality combined with category dropdown filtering, updating the grid immediately.
* [x] **Loading & Error handling**: User-friendly loading spinner animations and structured network fallback alert banners, proper loading and error states (no blank screen).
* [x] **Handwritten CSS layout**: Custom implementation of responsive CSS Grid and Flexbox layouts nested cleanly inside Bootstrap's container grid.

### 🔵 Excellent Tier (Completed)
* [x] **Event Delegation**: Native single-listener configurations attached on parent grid nodes (`#product-list` and `#cart-items-container`) to handle highly dynamic children actions.
* [x] **Synced Cart Badge**: Navbar badge displays the aggregate cart items count and dynamically syncs updates across all sub-pages in real time.
* [x] **Product sort**: (price up/down, name) and combining search + filter + sort simultaneously.
* [x] **High-quality source code**: Extracted reusable modules/functions, no duplication, standard naming, README with run instructions



