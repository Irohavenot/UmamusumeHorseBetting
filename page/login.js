
import { registerPage } from "./register.js";

export function loginPage(reloadApp) {

  const mount = document.getElementById("app");
  const tpl = document.getElementById("tpl-login");
  if (!tpl) { console.error("tpl-login not found"); return; }
  mount.replaceChildren(tpl.content.cloneNode(true));


  const form = document.getElementById("login-form");
  const help = document.getElementById("login-help");
  const toRegister = document.getElementById("to-register");

  toRegister.addEventListener("click", () => registerPage(reloadApp));

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    help.textContent = "";

    const username = (document.getElementById("login-username").value || "").trim();
    const password = (document.getElementById("login-password").value || "").trim();

    if (!username || !password) { help.textContent = "Please enter both username and password."; return; }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.username === username);

    if (!found) { help.textContent = "User not found. Try creating an account."; return; }
    if (found.password !== password) { help.textContent = "Incorrect password. Please try again."; return; }

    localStorage.setItem("currentUser", JSON.stringify(found));
    reloadApp();
  });
}
