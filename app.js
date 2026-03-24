const products = [
  { id: 1, name: "Classic White T-Shirt", category: "tops", price: 19.99 },
  { id: 2, name: "Denim Jacket", category: "tops", price: 59.99 },
  { id: 3, name: "Slim Fit Jeans", category: "bottoms", price: 49.99 },
  { id: 4, name: "Black Joggers", category: "bottoms", price: 39.99 },
  { id: 5, name: "Running Sneakers", category: "shoes", price: 74.99 },
  { id: 6, name: "Leather Belt", category: "accessories", price: 24.99 },
];

const cart = [];

const productsContainer = document.getElementById("products");
const categorySelect = document.getElementById("category");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

function formatPrice(price) {
  return price.toFixed(2);
}

function renderProducts(category = "all") {
  productsContainer.innerHTML = "";
  const visible =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  visible.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${formatPrice(product.price)}</p>
      <button type="button" data-id="${product.id}">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${item.name} - $${formatPrice(item.price)}</span>
      <button type="button" class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent = String(cart.length);
  cartTotal.textContent = formatPrice(total);
}

productsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) {
    return;
  }

  const id = Number(button.dataset.id);
  const product = products.find((entry) => entry.id === id);
  if (!product) {
    return;
  }

  cart.push(product);
  renderCart();
});

cartItems.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-index]");
  if (!button) {
    return;
  }

  const index = Number(button.dataset.index);
  cart.splice(index, 1);
  renderCart();
});

categorySelect.addEventListener("change", (event) => {
  renderProducts(event.target.value);
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert(`Thanks for your order! You purchased ${cart.length} item(s).`);
  cart.length = 0;
  renderCart();
});

renderProducts();
renderCart();
