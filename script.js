// Sample menu data - in a real app, this would come from Supabase
const menuData = [
  {
    id: 1,
    name: "Burger Kota",
    description:
      "Kota loaded with lettuce, cucumber, chips, burger patty, cheese & sauces",
    price: 30,
    category: "starters",
    image: "images/Regular.png",
  },
  {
    id: 2,
    name: "Russian Kota",
    description:
      "Kota loaded with lettuce, cucumber, chips, Russian, cheese & sauces",
    price: 30,
    category: "kota",
    image: "images/Russian.png",
  },
  {
    id: 3,
    name: "Regular Kota",
    description:
      "Kota loaded with lettuce, cucumber, chips, cheese, egg, burger OR Russian",
    price: 35,
    category: "kota",
    image: "images/BurgerKota.png",
  },
  {
    id: 4,
    name: "Beef Kota",
    description:
      "Lettuce, cucumber, chips, cheese, egg, smoked ham, Russian & burger",
    price: 50,
    category: "kota",
    image: "images/beef.png",
  },
  {
    id: 5,
    name: "Pork Kota",
    description:
      "Lettuce, cucumber, chips, egg, cheese, smoked ham, Russian and pork rib patty",
    price: 60,
    category: "mains",
    image: "images/Pork.png",
  },
  {
    id: 6,
    name: "Something Meaty",
    description:
      "Lettuce, cucumber, chips, eggs, cheese, burger, Russian, pork rib, smoked ham",
    price: 80,
    category: "mains",
    subcategory: "Main Dishes",
    image: "images/SomethingMeat.png",
  },
  {
    id: 7,
    name: "Quantum Bus",
    description:
      "Full loaf loaded with chips, 3x burgers, 3x Russians, 3x eggs, 3x cheese slices, smoked ham",
    price: 135,
    category: "mains",
    image: "images/Bus.png",
  },
  {
    id: 8,
    name: "Coca-Cola",
    description: "500ml bottled",
    price: 15,
    category: "drinks",

    subcategory: "cold",
    image: "images/ColaBottle.png",
  },
  {
    id: 13,
    name: "Coke Can",
    description: "Classic 330ml can ",
    price: 11,
    category: "drinks",
    subcategory: "cold",
    image: "images/colaCan.png",
  },
  {
    id: 9,
    name: "Fanta",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Fanta.png",
  },
  {
    id: 10,
    name: "Sprite",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Sprite.png",
  },
  {
    id: 11,
    name: "Stoney",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Stoney.png",
  },
  {
    id: 12,
    name: "Water Bottle",
    description: "500ml bottled water",
    price: 10,
    category: "drinks",
    subcategory: "cold",
    image: "images/Water.png",
  },
  {
    id: 14,
    name: "Gwinya",
    description: "Freshly made gwinya",
    price: 3,
    category: "starters",
    subcategory: "food",
    image: "images/gwinya.png",
  },
  {
    id: 15,
    name: "Sandwich",
    description: "Freshly made sandwich with your choice of fillings",
    price: 15,
    category: "starters",

    image: "images/Sandwich.png",
  },

  {
    id: 16,
    name: "CheeseSandwich",
    description: "Freshly made cheese sandwich",
    price: 12,
    category: "starters",
    image: "images/CheeseSandwich.png",
  },
  {
    id: 17,
    name: "Chips Small",
    description: "Crispy golden chips",
    price: 15,
    category: "sides",
    image: "images/Chips.png",
  },
  {
    id: 17,
    name: "Chips Medium",
    description: "Crispy golden chips",
    price: 20,
    category: "sides",
    image: "images/Chips.png",
  },
  {
    id: 18,
    name: "Chips Large",
    description: "Crispy golden chips",
    price: 30,
    category: "sides",
    image: "images/Chips.png",
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
          window.location.href = "inventory.html";
          break;
        case "cashier":
          window.location.href = "inventory.html";
          break;
        case "customer":
          window.location.href = "menu.html";
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
                    <span class="price">R${item.price.toFixed(2)}</span>
                    <button class="order-btn">Order</button>
                </div>
            </div>
        `;

    menuItemsContainer.appendChild(itemElement);
  });
}
