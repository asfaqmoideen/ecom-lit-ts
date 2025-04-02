import { LitElement, html, css } from "lit";
import { customElement} from "lit/decorators.js"

@customElement("custom-loader")
export class CustomLOader extends LitElement {
    static styles = 
        css`
            :host {
                display: block;
            }
            
            .loader {
                border: 8px solid #f3f3f3; 
                border-top:8px solid  #37474F;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;

    render() {
        return html`<div class="loader"></div>`;
    }
}

