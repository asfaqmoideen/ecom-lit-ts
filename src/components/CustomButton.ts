import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js"

@customElement("custom-button")
export class CustomButton extends LitElement {
    static styles = 
        css`
            :host {
                display: block;
            }
            button {
            width: 45%;
            padding: 0.6rem;
            border: none;
            border-radius: 0.4rem;
            background:rgb(5, 201, 116);
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.4s ease-in-out;
            }

            button:hover {
            background:rgb(80, 174, 133);
            }

        `;

    render() {
        return html`
        <button></button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "custom-button": CustomButton;
    }
}
