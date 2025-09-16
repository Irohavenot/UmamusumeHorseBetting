import { button } from "../components/button.js";


export const dashboard = () => {
       let title = document.createElement("h1");

   title.textContent = "Dashboard Page";

   document.body.appendChild(title);

    button("Test", "Button clicked")
}