
// Food Menu
const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "pizza",
        price: 199,
        image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500"
    },
    {
        id: 2,
        name: "Cheese Burger",
        category: "burger",
        price: 149,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
        id: 3,
        name: "Pepperoni Pizza",
        category: "pizza",
        price: 249,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
    },
    {
        id: 4,
        name: "French Fries",
        category: "burger",
        price: 99,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
        id: 5,
        name: "Cold Coffee",
        category: "drinks",
        price: 89,
        image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
    },
    {
        id: 6,
        name: "Fresh Juice",
        category: "drinks",
        price: 79,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500"
    }
];

// Cart
let cart = [];

// Display Food Items
function displayFoods(foodList) {

    const foodContainer = document.getElementById("food-container");

    foodContainer.innerHTML = "";

    foodList.forEach(food => {

        const card = document.createElement("div");

        card.className = "food-card";

        card.innerHTML = `
            <img src="${food.image}" alt="${food.name}">
            <h3>${food.name}</h3>
            <p>Price: ₹${food.price}</p>
            <button onclick="addToCart(${food.id})">
                Add to Cart
            </button>
        `;

        foodContainer.appendChild(card);

    });
}

// Filter Food by Category
function filterFood(category) {

    if (category === "all") {
        displayFoods(foods);
    } else {

        const filteredFoods = foods.filter(food => {
            return food.category === category;
        });

        displayFoods(filteredFoods);
    }
}

// Add Food to Cart
function addToCart(id) {

    const food = foods.find(item => item.id === id);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...food,
            quantity: 1
        });
    }

    updateCart();

}

// Increase or Decrease Quantity
function changeQuantity(id, amount) {

    const item = cart.find(food => food.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(food => food.id !== id);
    }

    updateCart();

}

// Update Cart
function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        const div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price} × ${item.quantity}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                ${item.quantity}
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
        `;

        cartItems.appendChild(div);

    });

    cartTotal.textContent = total;
    cartCount.textContent = count;

}

// Open and Close Cart
function toggleCart() {

    const cartPanel = document.getElementById("cart-panel");

    if (cartPanel.style.display === "block") {
        cartPanel.style.display = "none";
    } else {
        cartPanel.style.display = "block";
    }

}

// Place Order
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty! Please add some food.");
        return;
    }

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    alert("Order placed successfully!\nYour total is ₹" + total);

    cart = [];

    updateCart();

    toggleCart();

}

// Show Food Menu on Page Load
displayFoods(foods);
updateCart();
