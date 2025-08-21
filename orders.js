// Supabase setup
const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co"; // replace with your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4"; // replace with your anon key from Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
async function loadOrders() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      user_id,
      status,
      total,
      created_at,
      users!inner(username),
      order_items(
        menu_id,
        quantity,
        price,
        menu!inner(name)
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading orders:", error);
    return;
  }

  const tbody = document.getElementById("ordersTableBody");
  tbody.innerHTML = "";

  orders.forEach((order) => {
    const itemsList = order.order_items
      .map((item) => `${item.menu.name} (x${item.quantity})`)
      .join(", ");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.users.username}</td>
      <td>
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
      </td>
      <td>${order.total.toFixed(2)}</td>
      <td>${new Date(order.created_at).toLocaleString()}</td>
      <td>${itemsList}</td>
      <td>
        <button onclick="deleteOrder(${order.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  // Add event listeners for status changes
  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const orderId = parseInt(e.target.getAttribute("data-id"));
      const newStatus = e.target.value;
      updateStatus(orderId, newStatus);
    });
  });
}

// Update order status
async function updateStatus(orderId, newStatus) {
  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) console.error("Error updating status:", error);
}

// Delete order
async function deleteOrder(orderId) {
  if (!confirm("Are you sure you want to delete this order?")) return;

  const { error } = await supabase.from("orders").delete().eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error);
  } else {
    loadOrders();
  }
}

// Initial load
loadOrders();
