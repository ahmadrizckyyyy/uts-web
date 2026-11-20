const USERS_KEY = "nexus_users";
const SESSION_KEY = "nexus_logged_in_user";

// Ambil daftar user dari localStorage (sudah termasuk akun default admin)
function getRegisteredUsers() {
  const savedUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const defaultAdmin = {
    name: "Admin Nexus",
    username: "admin",
    password: "12345"
  };

  const hasDefaultAdmin = savedUsers.some((u) => u.username === defaultAdmin.username);
  if (!hasDefaultAdmin) {
    return [defaultAdmin, ...savedUsers];
  }
  return savedUsers;
}

// Tangani proses Registrasi
function handleRegister() {
  const form = document.getElementById("register-form");
  const alertBox = document.getElementById("register-alert");
  if (!form || !alertBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("reg-name").value.trim();
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm").value;

    if (password !== confirmPassword) {
      alertBox.innerHTML = `<div class="alert alert-danger py-2 small">Konfirmasi password tidak cocok!</div>`;
      return;
    }

    const users = getRegisteredUsers();
    const usernameExists = users.some((u) => u.username.toLowerCase() === username.toLowerCase());

    if (usernameExists) {
      alertBox.innerHTML = `<div class="alert alert-warning py-2 small">Username sudah terdaftar, gunakan username lain.</div>`;
      return;
    }

    users.push({ name, username, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    alertBox.innerHTML = `<div class="alert alert-success py-2 small">Registrasi berhasil! Mengalihkan ke halaman Login...</div>`;
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}

// Fungsi validasi Login menggunakan percabangan if
function validateLogin(usernameInput, passwordInput) {
  const users = getRegisteredUsers();
  const matchedUser = users.find(
    (u) => u.username === usernameInput && u.password === passwordInput
  );

  if (matchedUser) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(matchedUser));
    return {
      isValid: true,
      user: matchedUser
    };
  } else {
    return {
      isValid: false,
      message: "Username atau password tidak sesuai!"
    };
  }
}

// Tangani submit form Login
function handleLogin() {
  const form = document.getElementById("login-form");
  const alertBox = document.getElementById("login-alert");
  if (!form || !alertBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const result = validateLogin(username, password);

    if (result.isValid) {
      alertBox.innerHTML = `<div class="alert alert-success py-2 small">Login berhasil! Masuk ke Halaman Menu Utama...</div>`;
      setTimeout(() => {
        window.location.href = "menu.html";
      }, 800);
    } else {
      alertBox.innerHTML = `<div class="alert alert-danger py-2 small">${result.message}</div>`;
    }
  });
}

// Tampilkan info user di menu.html & tangani Logout
function initMenuSession() {
  const userNameEl = document.getElementById("menu-user-name");
  const logoutBtn = document.getElementById("logout-btn");

  if (!userNameEl && !logoutBtn) return;

  const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY));

  if (!sessionData) {
    window.location.href = "login.html";
    return;
  }

  if (userNameEl) {
    userNameEl.textContent = sessionData.name || sessionData.username;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem(SESSION_KEY);
      window.location.href = "login.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  handleRegister();
  handleLogin();
  initMenuSession();
});