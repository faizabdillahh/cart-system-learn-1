const products = [
    {
        id: 1,
        name: "Handphone",
        price: 1099,
        image: "assets/img/Handphone.jpg"
    },
    {
        id: 2,
        name: "Tablet",
        price: 999,
        image: "assets/img/Tablet.jpg"
    },
    {
        id: 3,
        name: "Laptop",
        price: 1699,
        image: "assets/img/Laptop.jpg"
    }
];

let cart = [];

const productList = document.querySelector("#product-list");
const cartList = document.querySelector("#cart-list");
const cartButton = document.querySelector("#cart-button");

function renderProducts() {
    productList.innerHTML = "";

    products.forEach(product => {
        productList.innerHTML += `
            <div class="card">
                <img class="card-image" src="${product.image}" alt="${product.name}" width ="150">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-price">$${product.price}</p>
                <button 
                    class="add-to-cart" 
                    onclick="addToCart(${product.id})"
                >
                    Add To Cart
                </button>
            </div>
        `;
    });
}

function addToCart(id) {
    const selectedProduct = products.find(product => product.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    renderCart();
}

function renderCart() {
    cartList.innerHTML = "";

    if (cart.length === 0) {
        cartList.innerHTML = `
            <h2 class="empty-message">
                Cart is empty
            </h2>
        `;
        return;
    }

    cart.forEach(product => {
        const total = product.price * product.quantity;

        cartList.innerHTML += `
            <div class="card">
                <img 
                    class="card-image" 
                    src="${product.image}" 
                    alt="${product.name}"
                    width ="150"
                >

                <h3 class="card-title">
                    ${product.name}
                </h3>

                <p class="card-price">
                    Price: $${product.price}
                </p>

                <div class="qty-control">
                    <button 
                        class="qty-btn"
                        onclick="decreaseQty(${product.id})"
                    >
                        -
                    </button>

                    <span class="qty-number">
                        ${product.quantity}
                    </span>

                    <button 
                        class="qty-btn"
                        onclick="increaseQty(${product.id})"
                    >
                        +
                    </button>
                </div>

                <p class="card-total">
                    Total: $${total}
                </p>
            </div>
        `;
    });
}

function decreaseQty(id) {
    const item = cart.find(product => product.id === id);

    item.quantity--;

    if (item.quantity === 0) {
        cart = cart.filter(product => product.id !== id);
    }

    renderCart();
}

function increaseQty(id) {
    const item = cart.find(product => product.id === id);

    item.quantity++;

    renderCart();
}

cartButton.addEventListener("click", () => {
    if (cartList.hidden) {
        cartList.hidden = false;
        productList.hidden = true;
        cartButton.textContent = "See Products";
        renderCart();
    } else {
        cartList.hidden = true;
        productList.hidden = false;
        cartButton.textContent = "Cart";
        renderProducts();
    }
});

renderProducts();