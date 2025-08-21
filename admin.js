// =============================
// Supabase Initialization
// =============================
const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co"; // replace with your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4"; // replace with your anon key from Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const adminMenuItems = document.getElementById("adminMenuItems");
const addItemForm = document.getElementById("addItemForm");

// Fetch all items
async function fetchMenu() {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.error("Error fetching menu:", error);
    return;
  }
  renderAdminMenu(data);
}

// Render items with Update/Delete buttons
function renderAdminMenu(items) {
  adminMenuItems.innerHTML = "";
  items.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("menu-item");
    div.innerHTML = `
      <div class="item-image" style="background-image: url('${
        item.image
      }')"></div>
      <div class="item-info">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="item-price">
          <span class="price">R${item.price.toFixed(2)}</span>
        </div>
        <input type="text" id="name-${item.id}" value="${item.name}" />
        <input type="text" id="desc-${item.id}" value="${item.description}" />
        <input type="number" id="price-${item.id}" value="${
      item.price
    }" step="0.01" />
        <input type="text" id="cat-${item.id}" value="${item.category}" />
        <input type="text" id="img-${item.id}" value="${item.image_url}" />
        <button onclick="updateItem(${item.id})">Update</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
    adminMenuItems.appendChild(div);
  });
}

// Add New Item
addItemForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const newItem = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: parseFloat(document.getElementById("price").value),
    category: document.getElementById("category").value,
    image: document.getElementById("imageUrl").value,
  };

  const { error } = await supabase.from("menu").insert([newItem]);
  if (error) {
    console.error("Error adding item:", error);
  } else {
    addItemForm.reset();
    fetchMenu(); // refresh menu
  }
});

// Update Item
async function updateItem(id) {
  const updatedItem = {
    name: document.getElementById(`name-${id}`).value,
    description: document.getElementById(`desc-${id}`).value,
    price: parseFloat(document.getElementById(`price-${id}`).value),
    category: document.getElementById(`cat-${id}`).value,
    image: document.getElementById(`img-${id}`).value,
  };

  const { error } = await supabase
    .from("menu")
    .update(updatedItem)
    .eq("id", id);
  if (error) {
    console.error("Error updating item:", error);
  } else {
    fetchMenu(); // refresh
  }
}

// Delete Item
async function deleteItem(id) {
  const { error } = await supabase.from("menu").delete().eq("id", id);
  if (error) {
    console.error("Error deleting item:", error);
  } else {
    fetchMenu(); // refresh
  }
}

// Load menu on page start
fetchMenu();
