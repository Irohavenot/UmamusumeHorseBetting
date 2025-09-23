// /page/register.js
export function registerPage(reloadApp) {
  const mount = document.getElementById("app");
  const tpl = document.getElementById("tpl-register");
  mount.replaceChildren(tpl.content.cloneNode(true));

  const form = document.getElementById("register-form");
  const help = document.getElementById("register-help");
  const toLogin = document.getElementById("to-login");

  toLogin.addEventListener("click", () => reloadApp());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    help.textContent = "";

    const username = (document.getElementById("reg-username").value || "").trim();
    const password = (document.getElementById("reg-password").value || "").trim();

    if (!username || !password) { help.textContent = "Please enter both a username and password."; return; }
    if (username.length < 3) { help.textContent = "Username must be at least 3 characters."; return; }
    if (password.length < 4) { help.textContent = "Password must be at least 4 characters."; return; }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.username === username)) { help.textContent = "Username already exists!"; return; }

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    help.style.color = "#16a34a";
    help.textContent = "Registered successfully! Redirecting to login…";
    setTimeout(() => reloadApp(), 600);
  });
}
