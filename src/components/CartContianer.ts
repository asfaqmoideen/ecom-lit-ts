import { LitElement, html, css } from "lit";
import { customElement} from "lit/decorators.js";



@customElement("cart-container")
export class CartContainer extends LitElement{
    
    render(){
        return html `
            <h1> Carts </h1>
        `;
    }

    static styles = css`
        :host{ 
        all : initial;
        flex:1;
        }

    `
}



