// =============================
// Supabase Init
// =============================

const SUPABASE_URL = "https://dqnmbayimyiuqfzdalox.supabase.co"; // replace with your Supabase project URL
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4"; // replace with your anon key from Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =============================
// Fetch Latest Order
// =============================
let latestOrder = null;

async function fetchLatestOrder(userId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching order:", error);
    return;
  }

  if (data && data.length > 0) {
    latestOrder = data[0];
    document.getElementById("orderId").textContent = latestOrder.id;
    document.getElementById("orderTotal").textContent = latestOrder.total;
  }
}

// =============================
// Handle Payment
// =============================
document.getElementById("payBtn").addEventListener("click", async () => {
  if (!latestOrder) {
    alert("No order found!");
    return;
  }

  const method = document.getElementById("paymentMethod").value;

  const payment = {
    order_id: latestOrder.id,
    amount: latestOrder.total,
    method,
    status: "paid", // mark as paid
    created_at: new Date().toISOString(),
  };

  console.log("💳 Payment to insert:", payment);

  // Insert into payments
  const { data, error } = await supabase
    .from("payments")
    .insert([payment])
    .select();

  if (error) {
    console.error("Error saving payment:", error);
    alert("Payment failed, check console.");
    return;
  }

  alert("Payment successful! 🎉");
  console.log("✅ Payment saved:", data);
});

// =============================
// Init
// =============================
// For now, hardcode logged in user (replace with auth later)
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const userId = loggedInUser?.id || null; // null if guest
fetchLatestOrder(userId);

// =============================
// Extra Buttons
// =============================
// document.getElementById("orderAgainBtn").addEventListener("click", () => {
//   window.location.href = "menu.html"; // go back to order page
// });

document.getElementById("logoutBtn").addEventListener("click", () => {
  // If you’re not using Supabase Auth yet, just redirect
  // Later, you can call supabase.auth.signOut()
  console.log("Logging out...");
  window.location.href = "index.html";
});
