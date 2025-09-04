// Initialize Supabase client
const supabaseUrl = "https://dqnmbayimyiuqfzdalox.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbm1iYXlpbXlpdXFmemRhbG94Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5OTIwOTYsImV4cCI6MjA3MDU2ODA5Nn0.XPsThMYTgbUX4JU743QhdDwPvVMcPZ1_3OBvMMGW5o4";
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

// Password strength calculator
function calculatePasswordStrength(password) {
  let strength = 0;
  let remarks = "";
  
  if (password.length >= 8) strength += 20;
  if (password.match(/[a-z]+/)) strength += 20;
  if (password.match(/[A-Z]+/)) strength += 20;
  if (password.match(/[0-9]+/)) strength += 20;
  if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength += 20;
  
  // Determine remarks based on strength
  if (strength <= 20) remarks = "Very weak";
  else if (strength <= 40) remarks = "Weak";
  else if (strength <= 60) remarks = "Medium";
  else if (strength <= 80) remarks = "Strong";
  else remarks = "Very strong";
  
  return { strength, remarks };
}

// Update password strength indicator
function updatePasswordStrength() {
  const password = document.getElementById("password").value;
  const { strength, remarks } = calculatePasswordStrength(password);
  const strengthBar = document.getElementById("passwordStrengthBar");
  const strengthText = document.getElementById("passwordStrengthText");
  
  strengthBar.style.width = `${strength}%`;
  
  // Set color based on strength
  if (strength <= 20) {
    strengthBar.style.background = "#e74c3c";
  } else if (strength <= 40) {
    strengthBar.style.background = "#e67e22";
  } else if (strength <= 60) {
    strengthBar.style.background = "#f1c40f";
  } else if (strength <= 80) {
    strengthBar.style.background = "#2ecc71";
  } else {
    strengthBar.style.background = "#27ae60";
  }
  
  strengthText.textContent = `Password strength: ${remarks}`;
}

// Toggle password visibility
function setupPasswordToggle() {
  const togglePassword = document.getElementById("togglePassword");
  const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  
  togglePassword.addEventListener("click", function() {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });
  
  toggleConfirmPassword.addEventListener("click", function() {
    const type = confirmPassword.getAttribute("type") === "password" ? "text" : "password";
    confirmPassword.setAttribute("type", type);
    this.querySelector("i").classList.toggle("fa-eye");
    this.querySelector("i").classList.toggle("fa-eye-slash");
  });
}

// Form submission handler
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Reset error messages
  document.querySelectorAll('.error-message').forEach(el => {
    el.style.display = 'none';
    el.textContent = '';
  });
  
  // Get form values
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const role = document.getElementById("role").value;
  
  // Validate form
  let isValid = true;
  
  if (username.length < 3) {
    document.getElementById("usernameError").textContent = "Username must be at least 3 characters";
    document.getElementById("usernameError").style.display = "block";
    isValid = false;
  }
  
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address";
    document.getElementById("emailError").style.display = "block";
    isValid = false;
  }
  
  if (phone.length < 10) {
    document.getElementById("phoneError").textContent = "Please enter a valid phone number";
    document.getElementById("phoneError").style.display = "block";
    isValid = false;
  }
  
  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password must be at least 6 characters";
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
  }
  
  if (password !== confirmPassword) {
    document.getElementById("confirmPasswordError").textContent = "Passwords do not match";
    document.getElementById("confirmPasswordError").style.display = "block";
    isValid = false;
  }
  
  if (!isValid) return;
  
  // Disable button to prevent multiple submissions
  const signupButton = document.getElementById("signupButton");
  signupButton.disabled = true;
  signupButton.textContent = "Creating account...";
  
  try {
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabaseClient
      .from("users")
      .select("email, username")
      .or(`email.eq.${email},username.eq.${username}`);
      
    if (checkError) {
      console.error("Error checking existing user:", checkError);
      throw checkError;
    }
    
    if (existingUsers && existingUsers.length > 0) {
      const existingEmail = existingUsers.find(user => user.email === email);
      const existingUsername = existingUsers.find(user => user.username === username);
      
      if (existingEmail) {
        document.getElementById("emailError").textContent = "An account with this email already exists";
        document.getElementById("emailError").style.display = "block";
      }
      
      if (existingUsername) {
        document.getElementById("usernameError").textContent = "Username already taken";
        document.getElementById("usernameError").style.display = "block";
      }
      
      signupButton.disabled = false;
      signupButton.textContent = "Sign Up";
      return;
    }
    
    // Insert new user into the database
    const { data, error } = await supabaseClient
      .from("users")
      .insert([
        { 
          username: username,
          email: email, 
          phone: phone,
          password_hash: password, // Note: In production, hash passwords before storing
          role: role,
          created_at: new Date().toISOString()
        }
      ])
      .select();
      
    if (error) {
      console.error("Error inserting user:", error);
      throw error;
    }
    
    // Show success message
    document.getElementById("successMessage").style.display = "block";
    
    // Redirect to login after 2 seconds
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
    
  } catch (error) {
    console.error("Signup error:", error);
    alert("Error creating account: " + error.message);
    signupButton.disabled = false;
    signupButton.textContent = "Sign Up";
  }
});

// Initialize page functionality
document.addEventListener("DOMContentLoaded", function() {
  setupPasswordToggle();
  
  // Add event listener for password strength updates
  document.getElementById("password").addEventListener("input", updatePasswordStrength);
});