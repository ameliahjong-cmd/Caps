let cart = JSON.parse(localStorage.getItem('capStoreCart')) || [];

function saveCart() {
    localStorage.setItem('capStoreCart', JSON.stringify(cart));
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    saveCart();
    alert(`${name} has been added to your cart!`);
}

function renderCart() {
    let cartContainer = document.getElementById('cart-container');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart-msg">
                <h2>Your cart is currently empty</h2>
                <p>Looks like you haven't added any caps to your cart yet.</p>
                <a href="store.html" class="btn">Explore Store</a>
            </div>
        `;
        return;
    }

    let html = `
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Cap Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;
    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <tr>
                <td>${item.name}</td>
                <td>P${item.price.toFixed(2)}</td>
                <td>${item.quantity}</td>
                <td>P${subtotal.toFixed(2)}</td>
                <td><button onclick="removeItem(${index})" style="color:#ff5722; background:none; border:none; cursor:pointer; font-weight:bold;">Remove</button></td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <div class="cart-summary">
            <h3>Total: P${total.toFixed(2)}</h3>
            <br>
            <button onclick="checkoutWhatsApp()" class="btn" style="background:#25d366;">Checkout via WhatsApp</button>
        </div>
    `;

    cartContainer.innerHTML = html;
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    let message = "Hello! I would like to place an order for the following caps:\n\n";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;
        total += subtotal;
        message += `- ${item.name} (x${item.quantity}) : P${subtotal.toFixed(2)}\n`;
    });

    message += `\n*Total Amount: P${total.toFixed(2)}*`;

    let encodedMessage = encodeURIComponent(message);
    let whatsappUrl = `https://wa.me/26773376976?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});
