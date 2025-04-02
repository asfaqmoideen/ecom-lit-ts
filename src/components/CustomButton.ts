import { LitElement, html, css } from "lit";
import { customElement, property} from "lit/decorators.js"

@customElement("custom-button")
export class CustomButton extends LitElement {
    @property({ attribute: true }) width = "100%"
    
    static styles = 
        css`
            :host {
                all:initial;
            }
            button {
            width:100%;
            padding: 0.6rem;
            border: none;
            border-radius: .8rem;
            background-color:#546E7A;
            color: white;
            cursor: pointer;
            margin-top: 0.8rem;
            transition: background 0.4s ease-in-out;
            }

            button:hover {
            background:#37474F;
            }

        `;

    render() {
        return html`
        <button>
            <slot></slot>
        </button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "custom-button": CustomButton;
    }
}
