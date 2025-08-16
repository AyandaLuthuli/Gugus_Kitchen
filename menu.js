// // menu.js

// // Your existing menuData array
// // (Make sure each id is unique)
// const menuData = [
//   {
//     id: 1,
//     name: "Burger Kota",
//     description:
//       "Kota loaded with lettuce, cucumber, chips, burger patty, cheese & sauces",
//     price: 30,
//     category: "starters",
//     image: "images/Regular.png",
//   },
//   {
//     id: 2,
//     name: "Russian Kota",
//     description:
//       "Kota loaded with lettuce, cucumber, chips, Russian, cheese & sauces",
//     price: 30,
//     category: "kota",
//     image: "images/Russian.png",
//   },
//   {
//     id: 3,
//     name: "Regular Kota",
//     description:
//       "Kota loaded with lettuce, cucumber, chips, cheese, egg, burger OR Russian",
//     price: 35,
//     category: "kota",
//     image: "images/BurgerKota.png",
//   },
//   {
//     id: 4,
//     name: "Beef Kota",
//     description:
//       "Lettuce, cucumber, chips, cheese, egg, smoked ham, Russian & burger",
//     price: 50,
//     category: "kota",
//     image: "images/beef.png",
//   },
//   {
//     id: 5,
//     name: "Pork Kota",
//     description:
//       "Lettuce, cucumber, chips, egg, cheese, smoked ham, Russian and pork rib patty",
//     price: 60,
//     category: "mains",
//     image: "images/Pork.png",
//   },
//   {
//     id: 6,
//     name: "Something Meaty",
//     description:
//       "Lettuce, cucumber, chips, eggs, cheese, burger, Russian, pork rib, smoked ham",
//     price: 80,
//     category: "mains",
//     image: "images/SomethingMeat.png",
//   },
//   {
//     id: 7,
//     name: "Quantum Bus",
//     description:
//       "Full loaf loaded with chips, 3x burgers, 3x Russians, 3x eggs, 3x cheese slices, smoked ham",
//     price: 135,
//     category: "mains",
//     image: "images/Bus.png",
//   },
//   {
//     id: 8,
//     name: "Coca-Cola",
//     description: "500ml bottled",
//     price: 15,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/ColaBottle.png",
//   },
//   {
//     id: 9,
//     name: "Coke Can",
//     description: "Classic 330ml can",
//     price: 11,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/colaCan.png",
//   },
//   {
//     id: 10,
//     name: "Fanta",
//     description: "500ml bottled",
//     price: 15,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/Fanta.png",
//   },
//   {
//     id: 11,
//     name: "Sprite",
//     description: "500ml bottled",
//     price: 15,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/Sprite.png",
//   },
//   {
//     id: 12,
//     name: "Stoney",
//     description: "500ml bottled",
//     price: 15,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/Stoney.png",
//   },
//   {
//     id: 13,
//     name: "Water Bottle",
//     description: "500ml bottled water",
//     price: 10,
//     category: "drinks",
//     subcategory: "cold",
//     image: "images/Water.png",
//   },
//   {
//     id: 14,
//     name: "Gwinya",
//     description: "Freshly made gwinya",
//     price: 3,
//     category: "starters",
//     subcategory: "food",
//     image: "images/gwinya.png",
//   },
//   {
//     id: 15,
//     name: "Sandwich",
//     description: "Freshly made sandwich with your choice of fillings",
//     price: 15,
//     category: "starters",
//     image: "images/Sandwich.png",
//   },
//   {
//     id: 16,
//     name: "Cheese Sandwich",
//     description: "Freshly made cheese sandwich",
//     price: 12,
//     category: "starters",
//     image: "images/CheeseSandwich.png",
//   },
//   {
//     id: 17,
//     name: "Chips Small",
//     description: "Crispy golden chips",
//     price: 15,
//     category: "sides",
//     image: "images/Chips.png",
//   },
//   {
//     id: 18,
//     name: "Chips Medium",
//     description: "Crispy golden chips",
//     price: 20,
//     category: "sides",
//     image: "images/Chips.png",
//   },
//   {
//     id: 19,
//     name: "Chips Large",
//     description: "Crispy golden chips",
//     price: 30,
//     category: "sides",
//     image: "images/Chips.png",
//   },
// ];

// // Render menu items to the page
// function renderMenuItems(items) {
//   const menuItemsContainer = document.getElementById("menuItems");
//   if (!menuItemsContainer) return;

//   menuItemsContainer.innerHTML = "";

//   items.forEach((item) => {
//     const itemElement = document.createElement("div");
//     itemElement.className = "menu-item";
//     itemElement.innerHTML = `
//       <div class="item-image" style="background-image: url('${
//         item.image
//       }')"></div>
//       <div class="item-info">
//           <h3>${item.name}</h3>
//           <p>${item.description}</p>
//           <div class="item-price">
//               <span class="price">R${item.price.toFixed(2)}</span>
//               <button class="order-btn">Order</button>
//           </div>
//       </div>
//     `;
//     menuItemsContainer.appendChild(itemElement);
//   });
// }

// // Initial load
// renderMenuItems(menuData);

// // Category filtering
// document.querySelectorAll(".tab-btn").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     document
//       .querySelectorAll(".tab-btn")
//       .forEach((b) => b.classList.remove("active"));
//     btn.classList.add("active");

//     const category = btn.getAttribute("data-category");
//     if (category === "all") {
//       renderMenuItems(menuData);
//     } else {
//       renderMenuItems(menuData.filter((item) => item.category === category));
//     }
//   });
// });
// Check login (optional, allows guest)
const user = JSON.parse(localStorage.getItem("loggedInUser"));

// Menu Data (keep your full array here)
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
    id: 9,
    name: "Coke Can",
    description: "Classic 330ml can",
    price: 11,
    category: "drinks",
    subcategory: "cold",
    image: "images/colaCan.png",
  },
  {
    id: 10,
    name: "Fanta",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Fanta.png",
  },
  {
    id: 11,
    name: "Sprite",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Sprite.png",
  },
  {
    id: 12,
    name: "Stoney",
    description: "500ml bottled",
    price: 15,
    category: "drinks",
    subcategory: "cold",
    image: "images/Stoney.png",
  },
  {
    id: 13,
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
    name: "Cheese Sandwich",
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
    id: 18,
    name: "Chips Medium",
    description: "Crispy golden chips",
    price: 20,
    category: "sides",
    image: "images/Chips.png",
  },
  {
    id: 19,
    name: "Chips Large",
    description: "Crispy golden chips",
    price: 30,
    category: "sides",
    image: "images/Chips.png",
  },
];

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Menu Items
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
        <p>${item.description}</p>
        <div class="item-price">
          <span class="price">R${item.price.toFixed(2)}</span>
          <button class="order-btn" data-id="${item.id}">Add to Cart</button>
        </div>
      </div>
    `;
    menuItemsContainer.appendChild(itemElement);
  });

  // Add event listeners to buttons
  document.querySelectorAll(".order-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      addToCart(id);
    });
  });
}

// Add to Cart
function addToCart(id) {
  const item = menuData.find((i) => i.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Render Cart
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

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.getAttribute("data-id"));
      removeFromCart(id);
    });
  });
}

// Remove item
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Initial render
renderMenuItems(menuData);
renderCart();

// Category filtering
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
