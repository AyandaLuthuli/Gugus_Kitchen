// =============================
// Supabase Init
// =============================
const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co"; // replace with your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4"; // replace with your anon key from Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// Fetch Orders
// =============================
async function fetchOrders() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      status,
      total,
      created_at,
      users ( username, email ),
      order_items (
        quantity,
        price,
        menu ( name )
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    return;
  }

  renderOrders(orders);
}

// =============================
// Render Orders
// =============================
function renderOrders(orders) {
  const container = document.getElementById("ordersContainer");
  container.innerHTML = "";

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "order-card";

    const header = document.createElement("div");
    header.className = "order-header";
    header.innerHTML = `
      <strong>Order #${order.id}</strong>
      <span>User: ${order.users?.username || "Guest"} (${
      order.users?.email || "N/A"
    })</span>
      <span class="status ${order.status}">${order.status}</span>
    `;

    const list = document.createElement("ul");
    list.className = "order-items";
    order.order_items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.menu.name} x${item.quantity} (R${item.price})`;
      list.appendChild(li);
    });

    const footer = document.createElement("div");
    footer.innerHTML = `
      <p><strong>Total:</strong> R${order.total}</p>
      <label>Update Status:</label>
      <select class="status-select" data-id="${order.id}">
        <option value="pending" ${
          order.status === "pending" ? "selected" : ""
        }>Pending</option>
        <option value="preparing" ${
          order.status === "preparing" ? "selected" : ""
        }>Preparing</option>
        <option value="completed" ${
          order.status === "completed" ? "selected" : ""
        }>Completed</option>
        <option value="cancelled" ${
          order.status === "cancelled" ? "selected" : ""
        }>Cancelled</option>
      </select>
    `;

    card.appendChild(header);
    card.appendChild(list);
    card.appendChild(footer);

    container.appendChild(card);
  });

  // Attach status change listeners
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const orderId = e.target.getAttribute("data-id");
      updateOrderStatus(orderId, e.target.value);
    });
  });
}

// =============================
// Update Order Status
// =============================
async function updateOrderStatus(orderId, newStatus) {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order:", error);
    alert("Failed to update order status.");
  } else {
    fetchOrders(); // reload orders
  }
}

// =============================
// Init
// =============================
fetchOrders();
