import { registerPage } from "./page/register.js";
import { loginPage } from "./page/login.js";
import { dashboardPage } from "./page/dashboard.js";

function loadApp() {
    const currentUser = localStorage.getItem("currentUser");

    if (!currentUser) {
        loginPage(loadApp);
    } else {
        dashboardPage(loadApp);
    }
}

loadApp();
