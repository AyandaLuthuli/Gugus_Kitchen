// Sample menu data - in a real app, this would come from Supabase
const menuData = [
  {
    id: 1,
    name: "Jollof Rice",
    description: "Flavorful rice cooked with tomatoes, peppers, and spices",
    price: 12.99,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1313&q=80",
  },
  {
    id: 2,
    name: "Suya",
    description: "Spicy skewered grilled meat with peanut seasoning",
    price: 9.99,
    category: "starters",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1398&q=80",
  },
  {
    id: 3,
    name: "Egusi Soup",
    description: "Traditional soup made with melon seeds and vegetables",
    price: 14.99,
    category: "mains",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    name: "Pounded Yam",
    description: "Smooth yam dough served with soups",
    price: 8.99,
    category: "sides",
    image:
      "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 5,
    name: "Chin Chin",
    description: "Crunchy fried pastry snacks",
    price: 4.99,
    category: "desserts",
    image:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1527&q=80",
  },
  {
    id: 6,
    name: "Zobo Drink",
    description: "Refreshing hibiscus tea with ginger and pineapple",
    price: 3.99,
    category: "drinks",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1525&q=80",
  },
];

// Login Page Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the login page
  if (document.getElementById("loginForm")) {
    const loginForm = document.getElementById("loginForm");
    const guestBtn = document.getElementById("guestBtn");

    // Handle form submission
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const role = document.querySelector('input[name="role"]:checked').value;

      // In a real app, this would authenticate with Supabase
      console.log(`Login attempt as ${role} with email: ${email}`);

      // Redirect based on role (simplified for demo)
      switch (role) {
        case "admin":
          window.location.href = "admin-dashboard.html";
          break;
        case "cashier":
          window.location.href = "cashier-dashboard.html";
          break;
        case "customer":
          window.location.href = "customer-dashboard.html";
          break;
      }
    });

    // Guest button redirect to menu
    guestBtn.addEventListener("click", function () {
      window.location.href = "menu.html";
    });
  }

  // Menu Page Functionality
  if (document.getElementById("menuItems")) {
    const menuItemsContainer = document.getElementById("menuItems");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const loginRedirectBtn = document.getElementById("loginRedirect");

    // Load all menu items initially
    renderMenuItems(menuData);

    // Tab filtering functionality
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Update active tab
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Filter items
        const category = this.getAttribute("data-category");
        const filteredItems =
          category === "all"
            ? menuData
            : menuData.filter((item) => item.category === category);

        renderMenuItems(filteredItems);
      });
    });

    // Login redirect button
    if (loginRedirectBtn) {
      loginRedirectBtn.addEventListener("click", function () {
        window.location.href = "index.html";
      });
    }
  }
});

// Render menu items to the page
function renderMenuItems(items) {
  const menuItemsContainer = document.getElementById("menuItems");
  if (!menuItemsContainer) return;

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
                <p>${item.description}</p>
                <div class="item-price">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="order-btn">Order</button>
                </div>
            </div>
        `;

    menuItemsContainer.appendChild(itemElement);
  });
}
