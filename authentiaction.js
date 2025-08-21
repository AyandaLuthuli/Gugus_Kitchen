const { createClient } = supabase;
const supabaseUrl = "https://dqnmbayimyiuqfzdalox.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4";
const supabaseClient = createClient(supabaseUrl, supabaseKey);

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.querySelector("input[name='role']:checked").value;

  const { data: users, error } = await supabaseClient
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("role", role)
    .limit(1);

  if (error) {
    alert("Error: " + error.message);
    return;
  }

  if (users.length === 0) {
    alert("Invalid email or role.");
    return;
  }

  const user = users[0];
  if (user.password_hash === password) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    if (role === "admin") {
      window.location.href = "admin.html";
    } else if (role === "cashier") {
      window.location.href = "menu.html";
    } else {
      window.location.href = "menu.html";
    }
  } else {
    alert("Incorrect password.");
  }
});

// Guest access
document.getElementById("guestBtn").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "menu.html";
});
