
import { Button } from "./button.js";

export const RaceCard = (race, onOpen, bets) => {
  const div = document.createElement("div");
  div.style.margin = "10px 0";
  div.style.padding = "10px";
  div.style.border = "1px solid #ccc";
  div.style.borderRadius = "8px";
  div.style.background = "#f9f9f9";

  // Race title
  const title = document.createElement("h3");
  title.textContent = race.name;
  div.appendChild(title);

  // Container for pool + button
  const bottomDiv = document.createElement("div");
  bottomDiv.style.display = "flex";
  bottomDiv.style.justifyContent = "space-between";
  bottomDiv.style.alignItems = "center";
  bottomDiv.style.marginTop = "8px";

  // calculate total pool
  const raceBets = bets[race.id] || [];
  const total = raceBets.reduce((sum, b) => sum + Number(b.amount), 0);

  const totalSpan = document.createElement("span");
  totalSpan.textContent = `Total Pool: ₱${total}`;
  bottomDiv.appendChild(totalSpan);

  const viewBtn = Button("View Race", () => onOpen(race));
  viewBtn.classList.add("btn", "btn-secondary", "btn-small");
  bottomDiv.appendChild(viewBtn);

  div.appendChild(bottomDiv);

  return div;
};
