// Initialize Supabase
const supabaseUrl = "https://dqnmbayimyiuqfzdalox.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4";
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Login Form Handler
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const selectedRole = document.querySelector(
    'input[name="role"]:checked'
  ).value;

  try {
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Get user's actual role from database
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (userError) throw userError;

    // Verify selected role matches database role
    if (user.role !== selectedRole) {
      throw new Error(`You don't have ${selectedRole} privileges`);
    }

    // Store user session
    sessionStorage.setItem("auth_token", data.session.access_token);
    sessionStorage.setItem("user_id", data.user.id);
    sessionStorage.setItem("user_role", user.role);

    // Redirect based on role
    if (user.role === "admin" || user.role === "cashier") {
      window.location.href = "inventory.html";
    } else {
      window.location.href = "menu.html";
    }
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);
  }
});

// Logout Function
function handleLogout() {
  sessionStorage.removeItem("auth_token");
  sessionStorage.removeItem("user_id");
  sessionStorage.removeItem("user_role");
  window.location.href = "index.html";
}
