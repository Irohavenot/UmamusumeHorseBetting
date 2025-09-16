import { log } from '../utils/log.js'

export const button = (buttonName,message) => {
    let button = document.createElement("button");

    button.textContent = buttonName;

    document.body.appendChild(button);

    // button
    
}