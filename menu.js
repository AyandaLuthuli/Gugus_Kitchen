// =============================
// Supabase Initialization
// =============================

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userId = loggedInUser?.id || null; // null if guest
console.log("Current User ID:", userId);

const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co"; // replace with your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4"; // replace with your anon key from Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// Global State
// =============================
let menuData = []; // fetched from Supabase
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// =============================
// Fetch Menu Items
// =============================
async function fetchMenu() {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching menu:", error);
    return;
  }

  menuData = data;
  renderMenuItems(menuData);
}

// =============================
// Render Menu Items
// =============================
function renderMenuItems(items) {
  const menuItemsContainer = document.getElementById("menuItems");
  menuItemsContainer.innerHTML = "";

  items.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.className = "menu-item";
    itemElement.innerHTML = `
      <div class="item-image" style="background-image: url('${
        item.image
      }')"></div>
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.description || ""}</p>
        <div class="item-price">
          <span class="price">R${parseFloat(item.price).toFixed(2)}</span>
          <button class="order-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuItemsContainer.appendChild(itemElement);
  });

  // Add to cart button listeners
  document.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// =============================
// Cart Functions
// =============================
function addToCart(id) {
  const item = menuData.find((i) => i.id === id);
  if (!item) return;

  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById("cartItems");
  const totalContainer = document.getElementById("cartTotal");

  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>R${(item.price * item.quantity).toFixed(2)}</span>
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);
  });

  totalContainer.textContent = `Total: R${total.toFixed(2)}`;

  // Remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// =============================
// Category Filtering
// =============================
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".tab-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.getAttribute("data-category");
    if (category === "all") {
      renderMenuItems(menuData);
    } else {
      renderMenuItems(menuData.filter((item) => item.category === category));
    }
  });
});

// =============================
// Initial Load
// =============================
fetchMenu();
renderCart();
// =============================
// Checkout Logic
// =============================
document.getElementById("checkoutBtn").addEventListener("click", async () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Calculate total
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  try {
    // 1️⃣ Insert into orders
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([{ user_id: userId, status: "pending", total }])
      .select()
      .single();

    if (orderError) throw orderError;

    const orderId = orderData.id;

    // 2️⃣ Prepare order_items
    const orderItems = cart.map((item) => ({
      order_id: orderId,
      menu_id: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    // 3️⃣ Insert order_items
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    alert("Cart successfully!");

    // 4️⃣ Clear cart
    cart = [];
    localStorage.removeItem("cart");
    renderCart();
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Something went wrong while placing your order.");
  }
  window.location.href = "PayAdvanced.html";
});

console.log("📝 Order to insert:", order);
console.log("📝 Order Items to insert:", orderItems);
