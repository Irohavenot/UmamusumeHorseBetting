
import { Table } from "../components/table.js";

export function profilePage(currentUser, reloadApp) {
  const mount = document.getElementById("app");
  const tpl = document.getElementById("tpl-profile");
  mount.replaceChildren(tpl.content.cloneNode(true));

  // Buttons
  document.getElementById("btn-back-dash").addEventListener("click", () => reloadApp());
  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    reloadApp();
  });

  // Data
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(u => u.username === currentUser.username) || currentUser;

  const earnings = Number(user.earnings || 0);
  const losses = Number(user.losses || 0);
  const history = Array.isArray(user.betHistory) ? user.betHistory : [];

  // Header
  document.getElementById("profile-username").textContent = currentUser.username;

  // Stats
  document.getElementById("stat-earnings").textContent = `₱${earnings}`;
  document.getElementById("stat-losses").textContent = `₱${losses}`;

  // History
  const mountHistory = document.getElementById("history-mount");
  const noHistory = document.getElementById("no-history");

  if (history.length > 0) {
    const table = Table(
      ["Race", "Horse", "Amount", "Result"],
      history.map(h => [h.race, h.horse, `₱${h.amount}`, h.result])
    );
    mountHistory.appendChild(table);
    noHistory.style.display = "none";
  } else {
    noHistory.style.display = "block";
  }
}
