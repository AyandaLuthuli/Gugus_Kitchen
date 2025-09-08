const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user || (user.role !== "admin" && user.role !== "cashier")) {
  window.location.href = "login.html";
}

// // DOM Elements

// const inventoryItemsContainer = document.getElementById("inventoryItems");
// const addItemBtn = document.getElementById("addItemBtn");
// const refreshBtn = document.getElementById("refreshBtn");
// const searchInput = document.getElementById("searchInput");
// const searchBtn = document.getElementById("searchBtn");
// const lowStockFilter = document.getElementById("lowStockFilter");
// const addItemModal = document.getElementById("addItemModal");
// const updateStockModal = document.getElementById("updateStockModal");
// const addItemForm = document.getElementById("addItemForm");
// const updateStockForm = document.getElementById("updateStockForm");
// const logoutBtn = document.getElementById("logoutBtn");

// // Global variables
// let currentUser = null;
// let inventoryItems = [];

// // Event Listeners
// document.addEventListener("DOMContentLoaded", checkAuthState);
// addItemBtn.addEventListener(
//   "click",
//   () => (addItemModal.style.display = "block")
// );
// refreshBtn.addEventListener("click", loadInventoryItems);
// searchBtn.addEventListener("click", filterInventoryItems);
// lowStockFilter.addEventListener("change", filterInventoryItems);
// logoutBtn.addEventListener("click", handleLogout);

// // Close modals when clicking the X
// document.querySelectorAll(".close-modal").forEach((btn) => {
//   btn.addEventListener("click", () => {
//     addItemModal.style.display = "none";
//     updateStockModal.style.display = "none";
//   });
// });

// // Close modals when clicking outside
// window.addEventListener("click", (e) => {
//   if (e.target === addItemModal) addItemModal.style.display = "none";
//   if (e.target === updateStockModal) updateStockModal.style.display = "none";
// });

// // Form submissions
// addItemForm.addEventListener("submit", handleAddItem);
// updateStockForm.addEventListener("submit", handleUpdateStock);

// // Functions
// async function checkAuthState() {
//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (error || !user) {
//     window.location.href = "index.html";
//     return;
//   }

//   const { data: userData, error: userError } = await supabase
//     .from("users")
//     .select("role")
//     .eq("id", user.id)
//     .single();

//   if (userError || !["admin", "cashier"].includes(userData.role)) {
//     window.location.href = "menu.html";
//     return;
//   }

//   currentUser = {
//     id: user.id,
//     email: user.email,
//     role: userData.role,
//   };

//   await loadInventoryItems();
// }

// async function loadInventoryItems() {
//   try {
//     const { data: items, error } = await supabase
//       .from("inventory")
//       .select("*")
//       .order("item_name", { ascending: true });

//     if (error) throw error;

//     inventoryItems = items;
//     renderInventoryItems(items);
//   } catch (error) {
//     console.error("Error loading inventory:", error);
//     inventoryItemsContainer.innerHTML =
//       '<p class="error">Error loading inventory. Please try again.</p>';
//   }
// }

// function renderInventoryItems(items) {
//   inventoryItemsContainer.innerHTML = "";

//   if (items.length === 0) {
//     inventoryItemsContainer.innerHTML =
//       '<p class="no-items">No inventory items found.</p>';
//     return;
//   }

//   items.forEach((item) => {
//     const itemElement = document.createElement("div");
//     itemElement.className = "inventory-item";
//     itemElement.innerHTML = `
//             <div class="item-name">${item.item_name}</div>
//             <div class="item-quantity ${
//               item.current_quantity <= item.reorder_threshold ? "low-stock" : ""
//             }">
//                 ${item.current_quantity}
//             </div>
//             <div class="item-unit">${item.unit_of_measure}</div>
//             <div class="item-reorder">${item.reorder_threshold}</div>
//             <div class="item-status">
//                 <span class="status-badge ${
//                   item.current_quantity <= item.reorder_threshold
//                     ? "badge-warning"
//                     : "badge-success"
//                 }">
//                     ${
//                       item.current_quantity <= item.reorder_threshold
//                         ? "Low Stock"
//                         : "In Stock"
//                     }
//                 </span>
//             </div>
//             <div class="item-actions">
//                 <button class="btn small update-btn" data-id="${
//                   item.id
//                 }">Update</button>
//                 ${
//                   currentUser.role === "admin"
//                     ? `<button class="btn small delete-btn" data-id="${item.id}">Delete</button>`
//                     : ""
//                 }
//             </div>
//         `;

//     inventoryItemsContainer.appendChild(itemElement);
//   });

//   // Add event listeners to buttons
//   document.querySelectorAll(".update-btn").forEach((btn) => {
//     btn.addEventListener("click", openUpdateModal);
//   });

//   document.querySelectorAll(".delete-btn").forEach((btn) => {
//     btn.addEventListener("click", handleDeleteItem);
//   });
// }

// function openUpdateModal(e) {
//   const itemId = parseInt(e.target.getAttribute("data-id"));
//   const item = inventoryItems.find((i) => i.id === itemId);

//   if (!item) return;

//   document.getElementById("updateItemId").value = item.id;
//   document.getElementById("currentStock").value = item.current_quantity;
//   updateStockModal.style.display = "block";
// }

// async function handleUpdateStock(e) {
//   e.preventDefault();

//   const itemId = parseInt(document.getElementById("updateItemId").value);
//   const adjustmentType = document.getElementById("adjustmentType").value;
//   const adjustmentAmount = parseFloat(
//     document.getElementById("adjustmentAmount").value
//   );
//   const notes = document.getElementById("adjustmentNotes").value;

//   if (isNaN(adjustmentAmount) || adjustmentAmount <= 0) {
//     alert("Please enter a valid amount");
//     return;
//   }

//   try {
//     const item = inventoryItems.find((i) => i.id === itemId);
//     let newQuantity = item.current_quantity;

//     switch (adjustmentType) {
//       case "add":
//         newQuantity += adjustmentAmount;
//         break;
//       case "subtract":
//         newQuantity -= adjustmentAmount;
//         if (newQuantity < 0) newQuantity = 0;
//         break;
//       case "set":
//         newQuantity = adjustmentAmount;
//         break;
//     }

//     // Update in Supabase
//     const { error } = await supabase
//       .from("inventory")
//       .update({
//         current_quantity: newQuantity,
//         last_updated: new Date().toISOString(),
//       })
//       .eq("id", itemId);

//     if (error) throw error;

//     // Record the transaction
//     await supabase.from("inventory_transactions").insert([
//       {
//         item_id: itemId,
//         user_id: currentUser.id,
//         adjustment_type: adjustmentType,
//         amount: adjustmentAmount,
//         previous_quantity: item.current_quantity,
//         new_quantity: newQuantity,
//         notes: notes,
//       },
//     ]);

//     // Refresh the inventory
//     await loadInventoryItems();
//     updateStockModal.style.display = "none";
//     alert("Stock updated successfully!");
//   } catch (error) {
//     console.error("Error updating stock:", error);
//     alert("Failed to update stock. Please try again.");
//   }
// }

// async function handleAddItem(e) {
//   e.preventDefault();

//   const itemName = document.getElementById("itemName").value.trim();
//   const initialQuantity = parseFloat(
//     document.getElementById("initialQuantity").value
//   );
//   const unitOfMeasure = document.getElementById("unitOfMeasure").value;
//   const reorderLevel = parseFloat(
//     document.getElementById("reorderLevel").value
//   );

//   if (!itemName || isNaN(initialQuantity) || isNaN(reorderLevel)) {
//     alert("Please fill all fields with valid values");
//     return;
//   }

//   try {
//     const { data, error } = await supabase
//       .from("inventory")
//       .insert([
//         {
//           item_name: itemName,
//           current_quantity: initialQuantity,
//           unit_of_measure: unitOfMeasure,
//           reorder_threshold: reorderLevel,
//           last_updated: new Date().toISOString(),
//         },
//       ])
//       .select();

//     if (error) throw error;

//     // Record the initial transaction
//     await supabase.from("inventory_transactions").insert([
//       {
//         item_id: data[0].id,
//         user_id: currentUser.id,
//         adjustment_type: "set",
//         amount: initialQuantity,
//         previous_quantity: 0,
//         new_quantity: initialQuantity,
//         notes: "Initial stock entry",
//       },
//     ]);

//     // Refresh and reset form
//     await loadInventoryItems();
//     addItemForm.reset();
//     addItemModal.style.display = "none";
//     alert("Item added successfully!");
//   } catch (error) {
//     console.error("Error adding item:", error);
//     alert("Failed to add item. Please try again.");
//   }
// }

// async function handleDeleteItem(e) {
//   if (
//     !confirm(
//       "Are you sure you want to delete this item? This cannot be undone."
//     )
//   ) {
//     return;
//   }

//   const itemId = parseInt(e.target.getAttribute("data-id"));

//   try {
//     const { error } = await supabase
//       .from("inventory")
//       .delete()
//       .eq("id", itemId);

//     if (error) throw error;

//     await loadInventoryItems();
//     alert("Item deleted successfully");
//   } catch (error) {
//     console.error("Error deleting item:", error);
//     alert("Failed to delete item. Please try again.");
//   }
// }

// function filterInventoryItems() {
//   const searchTerm = searchInput.value.toLowerCase();
//   const showLowStockOnly = lowStockFilter.checked;

//   let filteredItems = [...inventoryItems];

//   if (searchTerm) {
//     filteredItems = filteredItems.filter((item) =>
//       item.item_name.toLowerCase().includes(searchTerm)
//     );
//   }

//   if (showLowStockOnly) {
//     filteredItems = filteredItems.filter(
//       (item) => item.current_quantity <= item.reorder_threshold
//     );
//   }

//   renderInventoryItems(filteredItems);
// }

// async function handleLogout() {
//   const { error } = await supabase.auth.signOut();
//   window.location.href = "index.html";
// }
// // =============================
// Supabase Initialization
// =============================

////////////////////////////////////////////////////////////
const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// Supabase Initialization

// Use a placeholder user_id since we are skipping authentication
// Make sure this ID exists in your `users` table OR make it nullable in `inventory_transactions`
const DEFAULT_USER_ID = "00000000-0000-0000-0000-000000000000";

// =============================
// Fetch and Display Inventory
// =============================
async function fetchInventory() {
  const { data: inventory, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching inventory:", error);
    return;
  }

  supabase.from("inventory").select("*").then(console.log);
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) {
    console.error("Missing <tbody id='inventoryTableBody'> in HTML!");
    return;
  }
  tbody.innerHTML = "";

  inventory.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.item_name}</td>
        <td>${item.unit_of_measure}</td>
        <td>${item.current_quantity}</td>
        <td>${item.reorder_threshold}</td>
      <td>
        <button onclick="editItem(${item.id}, '${item.name}', ${item.current_quantity})">Edit</button>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// =============================
// Handle Add Item
// =============================
async function handleAddItem(e) {
  e.preventDefault();

  const name = document.getElementById("itemName").value;
  const category = document.getElementById("itemCategory").value;
  const unit = document.getElementById("itemUnit").value;
  const quantity = Number(document.getElementById("itemQuantity").value);
  const reorderLevel = Number(
    document.getElementById("itemReorderLevel").value
  );

  const { data, error } = await supabase
    .from("inventory")
    .insert([
      {
        name,
        category,
        unit,
        current_quantity: quantity,
        reorder_level: reorderLevel,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding item:", error);
    return;
  }

  // Log transaction
  await supabase.from("inventory_transactions").insert([
    {
      item_id: data[0].id,
      user_id: DEFAULT_USER_ID, // fallback user
      adjustment_type: "add",
      amount: quantity,
      previous_quantity: 0,
      new_quantity: quantity,
      notes: "Initial stock",
    },
  ]);

  fetchInventory();
  e.target.reset();
}

// =============================
// Handle Update Stock
// =============================
async function handleUpdateStock(e) {
  e.preventDefault();

  const itemId = Number(document.getElementById("updateItemId").value);
  const adjustmentType = document.getElementById("adjustmentType").value;
  const adjustmentAmount = Number(
    document.getElementById("adjustmentAmount").value
  );
  const notes = document.getElementById("updateNotes").value;

  const { data: itemData, error: fetchError } = await supabase
    .from("inventory")
    .select("*")
    .eq("id", itemId)
    .single();

  if (fetchError || !itemData) {
    console.error("Error fetching item:", fetchError);
    return;
  }

  let newQuantity = Number(itemData.current_quantity);

  if (adjustmentType === "add") {
    newQuantity += adjustmentAmount;
  } else if (adjustmentType === "subtract") {
    newQuantity -= adjustmentAmount;
  } else if (adjustmentType === "set") {
    newQuantity = adjustmentAmount;
  }

  // Prevent negative stock
  if (newQuantity < 0) newQuantity = 0;

  // Update inventory
  const { error: updateError } = await supabase
    .from("inventory")
    .update({ current_quantity: newQuantity })
    .eq("id", itemId);

  if (updateError) {
    console.error("Error updating inventory:", updateError);
    return;
  }

  // Map adjustmentType to DB values
  let transactionType = adjustmentType;
  if (adjustmentType === "subtract") transactionType = "remove";

  // Insert transaction
  await supabase.from("inventory_transactions").insert([
    {
      item_id: itemId,
      user_id: DEFAULT_USER_ID,
      adjustment_type: transactionType,
      amount: adjustmentAmount,
      previous_quantity: itemData.current_quantity,
      new_quantity: newQuantity,
      notes: notes,
    },
  ]);

  fetchInventory();
  e.target.reset();
}

// =============================
// Delete Item
// =============================
async function deleteItem(itemId) {
  const confirmDelete = confirm("Are you sure you want to delete this item?");
  if (!confirmDelete) return;

  const { error } = await supabase.from("inventory").delete().eq("id", itemId);
  if (error) {
    console.error("Error deleting item:", error);
    return;
  }

  fetchInventory();
}

// =============================
// Prefill Edit Form
// =============================
function editItem(id, name, currentQuantity) {
  document.getElementById("updateItemId").value = id;
  document.getElementById("adjustmentAmount").value = "";
  document.getElementById(
    "updateNotes"
  ).value = `Editing ${name} (current: ${currentQuantity})`;
}

// =============================
// Event Listeners
// =============================
document
  .getElementById("addItemForm")
  .addEventListener("submit", handleAddItem);
document
  .getElementById("updateStockForm")
  .addEventListener("submit", handleUpdateStock);

// =============================
// Start App
// =============================
fetchInventory();
