const USERS_KEY = "nexus_users";
const SESSION_KEY = "nexus_logged_in_user";
const AUTH_NOTICE_KEY = "nexus_auth_notice";

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

    if (!name || !username || !password) {
      alertBox.innerHTML = `<div class="alert alert-danger py-2 small">Semua field wajib diisi!</div>`;
      return;
    }

    if (password !== confirmPassword) {
      alertBox.innerHTML = `<div class="alert alert-danger py-2 small">Konfirmasi password tidak cocok!</div>`;
      return;
    }

    const users = getRegisteredUsers();
    const usernameExists = users.some(
      (u) => u.username.toLowerCase() === username.toLowerCase()
    );

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
  }

  return {
    isValid: false,
    message: "Username atau password tidak sesuai!"
  };
}

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

function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = "login.html";
}

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
    logoutBtn.addEventListener("click", logoutUser);
  }
}

function initNavbarSession() {
  const navContainer = document.getElementById("index-auth-nav");
  if (!navContainer) return;

  const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!sessionData) return;

  const displayName = sessionData.name || sessionData.username;
  navContainer.innerHTML = `
    <li class="nav-item">
      <a class="nav-link active" href="index.html">Beranda</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="menu.html">Menu Utama</a>
    </li>
    <li class="nav-item">
      <span class="badge bg-primary py-2 px-3">Login: ${displayName}</span>
    </li>
    <li class="nav-item">
      <button type="button" id="nav-logout-btn" class="btn btn-outline-light btn-sm px-3 mt-1 mt-lg-0">
        Logout
      </button>
    </li>
  `;

  const navLogoutBtn = document.getElementById("nav-logout-btn");
  if (navLogoutBtn) {
    navLogoutBtn.addEventListener("click", logoutUser);
  }
}

function requireAuthForDetail() {
  const isDetailPage = window.location.href.includes("detail.html");
  if (!isDetailPage) return;

  const sessionData = JSON.parse(localStorage.getItem(SESSION_KEY));
  if (!sessionData) {
    sessionStorage.setItem(
      AUTH_NOTICE_KEY,
      "Anda harus login terlebih dahulu untuk melihat informasi detail."
    );
    sessionStorage.setItem("redirect_after_login", window.location.href);
    window.location.replace("login.html");
  }
}

function showAuthNoticeOnLogin() {
  const alertBox = document.getElementById("login-alert");
  if (!alertBox) return;

  const notice = sessionStorage.getItem(AUTH_NOTICE_KEY);
  if (notice) {
    sessionStorage.removeItem(AUTH_NOTICE_KEY);
    alertBox.innerHTML = `
      <div class="alert alert-warning py-2 small mb-3" role="alert">
        ${notice}
      </div>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  requireAuthForDetail();
  showAuthNoticeOnLogin();
  handleRegister();
  handleLogin();
  initMenuSession();
  initNavbarSession();
});