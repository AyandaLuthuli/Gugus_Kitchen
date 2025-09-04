const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// =============================
// Supabase Initialization
// =============================

// =============================
// Load Reports
// =============================
async function loadReports() {
  // USERS
  const { data: users, error: userError } = await supabase
    .from("users")
    .select("*");
  if (userError) {
    console.error("Users error:", userError.message);
    return;
  }

  document.getElementById("totalUsers").textContent = users.length;
  const rolesCount = { admin: 0, cashier: 0, customer: 0 };
  users.forEach((u) => {
    rolesCount[u.role] = (rolesCount[u.role] || 0) + 1;
  });
  document.getElementById("totalAdmins").textContent = rolesCount.admin || 0;
  document.getElementById("totalCashiers").textContent =
    rolesCount.cashier || 0;
  document.getElementById("totalCustomers").textContent =
    rolesCount.customer || 0;

  // ORDERS
  const { data: orders, error: orderError } = await supabase
    .from("orders")
    .select("id, total, created_at, users(name)");
  if (orderError) {
    console.error("Orders error:", orderError.message);
  }
  document.getElementById("totalOrders").textContent = orders?.length || 0;

  // PAYMENTS
  const { data: payments, error: payError } = await supabase
    .from("payments")
    .select("*");
  if (payError) {
    console.error("Payments error:", payError.message);
  }

  const totalSales =
    payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
  document.getElementById("totalSales").textContent = totalSales.toFixed(2);

  const paymentMethods = {};
  payments?.forEach((p) => {
    paymentMethods[p.method] = (paymentMethods[p.method] || 0) + 1;
  });

  // INVENTORY
  const { data: inventory, error: invError } = await supabase
    .from("inventory")
    .select("*");
  if (invError) {
    console.error("Inventory error:", invError.message);
  }

  console.log("Supabase:", supabase);

  document.getElementById("totalItems").textContent = inventory?.length || 0;
  const belowReorder =
    inventory?.filter((i) => i.current_quantity < i.reorder_threshold).length ||
    0;
  document.getElementById("belowReorder").textContent = belowReorder;

  // Fill inventory table
  const invTable = document.getElementById("inventoryTableBody");
  invTable.innerHTML = "";
  inventory?.forEach((i) => {
    invTable.innerHTML += `
      <tr style="color:${
        i.current_quantity < i.reorder_threshold ? "red" : "black"
      }">
        <td>${i.item_name}</td>
        <td>${i.unit_of_measure}</td>
        <td>${i.current_quantity}</td>
        <td>${i.reorder_threshold}</td>
      </tr>`;
  });

  // Fill orders table (latest 5)
  const ordTable = document.getElementById("ordersTableBody");
  ordTable.innerHTML = "";
  orders?.slice(-5).forEach((o) => {
    ordTable.innerHTML += `
      <tr>
        <td>${o.id}</td>
        <td>${o.users ? o.users.name : "Guest"}</td>
        <td>${o.total || "-"}</td>
        <td>${new Date(o.created_at).toLocaleString()}</td>
      </tr>`;
  });

  // === CHARTS ===
  const ctxUsers = document.getElementById("usersChart").getContext("2d");
  new Chart(ctxUsers, {
    type: "pie",
    data: {
      labels: Object.keys(rolesCount),
      datasets: [{ data: Object.values(rolesCount) }],
    },
  });

  const ctxPay = document.getElementById("paymentChart").getContext("2d");
  new Chart(ctxPay, {
    type: "doughnut",
    data: {
      labels: Object.keys(paymentMethods),
      datasets: [{ data: Object.values(paymentMethods) }],
    },
  });

  const ctxInv = document.getElementById("inventoryChart").getContext("2d");
  new Chart(ctxInv, {
    type: "bar",
    data: {
      labels: inventory?.map((i) => i.item_name) || [],
      datasets: [
        {
          label: "Stock",
          data: inventory?.map((i) => i.current_quantity) || [],
        },
      ],
    },
  });
}

loadReports();
