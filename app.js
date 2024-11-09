// app.js
const cart = [];

// Fetch products from the backend
function fetchProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}

// Display products on the page
function displayProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Clear previous content

    products.forEach(product => {
        productsContainer.innerHTML += `
            <div class="product">
                <img src="${product.image_url}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Add product to cart
function addToCart(productId) {
    const quantity = 1;
    const product = { productId, quantity };

    fetch('http://localhost:3000/add-to-cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        cart.push(product);
        updateCartCount();
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
    });
}

// Update cart item count
function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

// Modal functionality
var contactModal = document.getElementById("contactModal");
var aboutModal = document.getElementById("aboutModal");

var contactUsLink = document.getElementById("contactUsLink");
var aboutUsLink = document.getElementById("aboutUsLink");

var closeContactModal = document.getElementById("closeContactModal");
var closeAboutModal = document.getElementById("closeAboutModal");

contactUsLink.addEventListener("click", function(event) {
    event.preventDefault();
    contactModal.style.display = "block";
});

aboutUsLink.addEventListener("click", function(event) {
    event.preventDefault();
    aboutModal.style.display = "block";
});

closeContactModal.addEventListener("click", function() {
    contactModal.style.display = "none";
});

closeAboutModal.addEventListener("click", function() {
    aboutModal.style.display = "none";
});

window.addEventListener("click", function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
    if (event.target == aboutModal) {
        aboutModal.style.display = "none";
    }
});

// On page load
window.onload = function() {
    fetchProducts();
};
