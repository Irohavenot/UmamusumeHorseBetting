
import { Button } from "../components/button.js";
import { Table } from "../components/table.js";
import { RaceCard } from "../components/raceCard.js";
import { profilePage } from "./profilePage.js";
const horseImages = {
        "Special Week": "images/specialweek_icon.png",
        "El Condor Pasa": "images/elcondorpasa_icon.png",
        "Gold Ship": "images/goldship_icon.png",
        "Meisho Doto": "images/meishodoto_icon.png",
        "Grass Wonder": "images/grasswonder_icon.png",
        "Taiki Shuttle": "images/taikishuttle_icon.png",
        "Sakura Bakushin O": "images/sakurabakushino_icon.png",
        "Haru Urara": "images/haruurara_icon.png",
        "King Halo": "images/kinghalo_icon.png",
        "Nishino Flower": "images/nishinoflower_icon.png",
        "Mejiro Mcqueen": "images/mejiromcqueen_icon.png",
        "Tokai Teio": "images/tokaiteio_icon.png",
        "Mejiro Ryan": "images/mejiroryan_icon.png",
        "Mayano Top Gun": "images/mayanotopgun_icon.png",
        "Super Creek": "images/supercreek_icon.png",
        "Air Groove": "images/airgroove_icon.png",
        "Fine Motion": "images/finemotion_icon.png",
        "Nice Nature": "images/nicenature_icon.png"
        };
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
        
function generateRaces() {
  return [
    {
      id: 1,
      name: "Tokyo Racecourse - Japanese Derby",
      icon: "images/japanesederby.png",
      horses: ["Special Week", "El Condor Pasa", "Gold Ship", "Meisho Doto", "Grass Wonder", "Air Groove"]
    },
    {
      id: 2,
      name: "Nakayama Racecourse - Sprinter Stakes",
      icon: "images/sprinterstakes.png",
      horses: ["Taiki Shuttle", "Sakura Bakushin O", "Haru Urara", "King Halo", "Nishino Flower", "Fine Motion"]
    },
    {
      id: 3,
      name: "Kyoto Racecourse - Tenno Sho (Spring)",
      icon: "images/tennosho.png",
      horses: ["Mejiro Mcqueen", "Tokai Teio", "Mejiro Ryan", "Mayano Top Gun", "Super Creek", "Nice Nature"]
    }
  ];
}

export function dashboardPage(reloadApp) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const races = generateRaces();

  const mount = document.getElementById("app");
  const tpl = document.getElementById("tpl-dashboard");
  mount.replaceChildren(tpl.content.cloneNode(true));

  // Navbar
  document.getElementById("btn-profile").addEventListener("click", () =>
    profilePage(currentUser, reloadApp)
  );
  document.getElementById("btn-logout").addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    reloadApp();
  });

  // Greeting
  document.getElementById("dash-username").textContent = currentUser.username;

  const usersTableMount = document.getElementById("users-table");
  const raceList = document.getElementById("race-list");
  const detailsEl = document.getElementById("race-details");

  function getBets() {
    return JSON.parse(localStorage.getItem("bets") || "{}");
  }
  function setBets(bets) {
    localStorage.setItem("bets", JSON.stringify(bets));
  }
  function getUsers() {
    return JSON.parse(localStorage.getItem("users") || "[]");
  }
  function setUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
  }

  function renderUsersTable() {
    usersTableMount.innerHTML = "";
    const users = getUsers();
    const table = Table(["Username"], users.map(u => [u.username]));
    usersTableMount.appendChild(table);
  }

  function decorateRaceHeading(cardEl, race) {
    const heading = cardEl.querySelector("h1,h2,h3,h4,h5,.race-title,.card-title");
    if (!heading) return;
    heading.textContent = (race.name || "").trim();
    if (!race.icon) return;
    const img = document.createElement("img");
    img.src = race.icon;
    img.alt = "race icon";
    img.className = "race-inline-icon";
    heading.appendChild(img);
  }

  function showRaceDetails(race) {
    // unhide if minimized before
    detailsEl.style.removeProperty("display");
    detailsEl.innerHTML = "";

    const title = document.createElement("h4");
    title.textContent = `Race Details - ${race.name}`;
    detailsEl.appendChild(title);

    const bets = getBets();

    // Build the 3–2 gallery grid
const grid = document.createElement("div");
grid.className = "horse-grid";
detailsEl.appendChild(grid);

const thisRaceBets = bets[race.id] || [];

        race.horses.forEach((horse, idx) => {
    // If total % 3 === 2, insert a spacer before the last 2 to center them
        if (race.horses.length % 3 === 2 && idx === race.horses.length - 2) {
            const spacer = document.createElement("div");
            spacer.className = "horse-card spacer";
            grid.appendChild(spacer);
        }

        const horseTotal = thisRaceBets
            .filter(b => b.horse === horse)
            .reduce((sum, b) => sum + Number(b.amount), 0);

        const card = document.createElement("div");
        card.className = "horse-card";
        card.dataset.horse = horse;

        const img = document.createElement("img");
        img.loading = "lazy";
        img.alt = horse;
        img.src = horseImages[horse] || `images/${slug(horse)}_icon.jpg`;

        const nameEl = document.createElement("div");
        nameEl.className = "horse-name";
        nameEl.textContent = horse;

        const totalEl = document.createElement("div");
        totalEl.className = "horse-total";
        totalEl.textContent = `Total bets: ₱${horseTotal.toLocaleString("en-PH")}`;

        card.append(img, nameEl, totalEl);
        grid.appendChild(card);
        });

    
    // Bet form
    const betForm = document.createElement("form");
    betForm.style.marginTop = "10px";
    betForm.innerHTML = `
            <div class="bet-controls">
                <label class="sr-only" for="bet-horse">Horse</label>
                <select id="bet-horse" name="horse" class="form-select" required>
                ${race.horses.map(h => `<option value="${h}">${h}</option>`).join("")}
                </select>

                <label class="sr-only" for="bet-amount">Amount</label>
                <div class="currency-input">
                <span class="currency-prefix">₱</span>
                <input id="bet-amount"
                        name="amount"
                        type="text"
                        class="form-input"
                        placeholder="0"
                        required min="1" step="1"
                        inputmode="numeric" />
                </div>

                <button type="submit" class="btn btn-primary btn-small">Place Bet</button>
            </div>
        `;
    detailsEl.appendChild(betForm);
const amountEl = betForm.querySelector('#bet-amount');
amountEl.addEventListener('input', () => {
  const digits = amountEl.value.replace(/[^\d]/g, '');
  amountEl.value = new Intl.NumberFormat('en-PH').format(digits ? Number(digits) : 0);
});

const selectEl = betForm.querySelector("#bet-horse");

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".horse-card");
  if (!card || card.classList.contains("spacer")) return;
  const horse = card.dataset.horse;
  selectEl.value = horse;

  grid.querySelectorAll(".horse-card").forEach(c => c.classList.remove("selected"));
  card.classList.add("selected");
});


    betForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const betsNow = getBets();
      const horse = betForm.horse.value;
      const raw = (betForm.amount.value || "0").replace(/[^\d]/g, "");
      const amount = Number(raw);

      if (!betsNow[race.id]) betsNow[race.id] = [];
      betsNow[race.id].push({ user: currentUser.username, horse, amount });
      setBets(betsNow);

      // Re-render races (to update Total Pool on cards) and keep this race open
      renderRaces(race.id);
      // Also re-render details so the per-horse totals update
      showRaceDetails(race);
    });

    // Actions
    const actions = document.createElement("div");
    actions.style.marginTop = "10px";

    const resultBtn = document.createElement("button");
    resultBtn.textContent = "View Race Results";
    resultBtn.className = "btn btn-primary"; 
    resultBtn.style.marginRight = "8px";
    resultBtn.addEventListener("click", () => simulateRace(race));
    actions.appendChild(resultBtn);

    const minimizeBtn = document.createElement("button");
    minimizeBtn.textContent = "Minimize";
    minimizeBtn.className = "btn btn-ghost";
    minimizeBtn.addEventListener("click", () => {
      detailsEl.innerHTML = "";
      detailsEl.style.display = "none";
    });
    actions.appendChild(minimizeBtn);

    detailsEl.appendChild(actions);
  }

  function simulateRace(race) {
    const bets = getBets();
    const raceBets = bets[race.id] || [];
    if (raceBets.length === 0) { alert("No bets placed yet!"); return; }

    const winner = race.horses[Math.floor(Math.random() * race.horses.length)];
    alert(`🏇 The winner is: ${winner}!`);

    const users = getUsers().map(u => {
      if (!u.earnings) u.earnings = 0;
      if (!u.losses) u.losses = 0;
      if (!u.betHistory) u.betHistory = [];
      const userBets = raceBets.filter(b => b.user === u.username);
      userBets.forEach(b => {
        if (b.horse === winner) {
          u.earnings += b.amount * 2;
          u.betHistory.push({ race: race.name, horse: b.horse, amount: b.amount, result: "Won" });
        } else {
          u.losses += b.amount;
          u.betHistory.push({ race: race.name, horse: b.horse, amount: b.amount, result: "Lost" });
        }
      });
      return u;
    });
    setUsers(users);

    // clear pool for this race
    delete bets[race.id];
    setBets(bets);

    // Re-render everything that depends on users/bets
    renderUsersTable();
    renderRaces(); 
    detailsEl.innerHTML = ""; // race is over, clear details
  }

  function renderRaces(selectedRaceId = null) {
    raceList.innerHTML = "";

    const bets = getBets();

    races.forEach(race => {

      const card = RaceCard(
        race,
        // on "view details" in card:
        () => showRaceDetails(race),
        bets
      );

      card.style.float = "none";
      card.style.display = "block";
      card.style.width = "100%";

      decorateRaceHeading(card, race);

      const item = document.createElement("div");
      item.className = "race-item";
      item.appendChild(card);
      raceList.appendChild(item);

      if (selectedRaceId && race.id === selectedRaceId) {
        showRaceDetails(race);
      }
    });
  }

  // initial render
  renderUsersTable();
  renderRaces();
}
